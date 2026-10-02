/**
 * ==============================================================================
 * สคริปต์ดึงโพสต์และรูปภาพจาก Facebook ของโรงเรียนเข้าสู่ Supabase อัตโนมัติ
 * - ดึงรูปภาพจริงจาก Facebook CDN แล้วเซฟลง public/news/
 * - โพสต์ไหนไม่มีรูปจริง ก็แสดงเป็นข้อความอย่างเดียว (ไม่ใช้รูป AI)
 * - ทำงานบน GitHub Actions ทุกๆ 2 ชั่วโมง หรือสั่งรันแบบ Manual
 * ==============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rsukgfvutcagkpcfatfw.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWtnZnZ1dGNhZ2twY2ZhdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzQwODEsImV4cCI6MjA5OTA1MDA4MX0.YoIDvfwtSM-jO32vbRvsmV7mRzNd3UEB0epIAeAxyZ0';
const FB_TARGET_ID = process.env.FB_TARGET_ID || '100057502268064';
const FB_COOKIE = process.env.FB_COOKIE || '';

// Path ไปยังโฟลเดอร์เก็บรูปข่าว (อยู่ใน public/news/ ของโปรเจกต์)
const NEWS_IMG_DIR = path.resolve(__dirname, '..', 'public', 'news');

/**
 * ฟังก์ชันช่วยเรียก URL พร้อมจัดการ Redirect และ Cookie
 */
async function fetchWithRedirects(url, headers = {}, maxRedirects = 5) {
  let currentUrl = url;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    console.log(`[HTTP GET] ${currentUrl}`);
    const res = await fetch(currentUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        ...(FB_COOKIE ? { 'Cookie': FB_COOKIE } : {}),
        ...headers
      },
      redirect: 'manual'
    });

    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      let location = res.headers.get('location');
      if (location.startsWith('/')) {
        const u = new URL(currentUrl);
        location = `${u.origin}${location}`;
      }
      console.log(`[Redirect ${res.status}] ➔ ${location}`);
      currentUrl = location;
      redirectCount++;
    } else {
      const text = await res.text();
      return { status: res.status, headers: res.headers, text, finalUrl: currentUrl };
    }
  }

  throw new Error(`Too many redirects (exceeded ${maxRedirects})`);
}

/**
 * ฟังก์ชันค้นหา URL รูปภาพทั้งหมดที่มีใน Object
 */
function extractImagesFromObject(obj) {
  const images = [];

  function walk(o) {
    if (!o || typeof o !== 'object') return;

    if (o.image && o.image.uri && typeof o.image.uri === 'string' && o.image.uri.includes('scontent')) {
      images.push(o.image.uri);
    }
    if (o.viewer_image && o.viewer_image.uri && typeof o.viewer_image.uri === 'string' && o.viewer_image.uri.includes('scontent')) {
      images.push(o.viewer_image.uri);
    }
    if (o.photo_image && o.photo_image.uri && typeof o.photo_image.uri === 'string' && o.photo_image.uri.includes('scontent')) {
      images.push(o.photo_image.uri);
    }
    if (o.uri && typeof o.uri === 'string' && o.uri.includes('scontent') && !o.uri.includes('rsrc.php')) {
      images.push(o.uri);
    }

    for (const key of Object.keys(o)) {
      if (typeof o[key] === 'object' && o[key] !== null) {
        walk(o[key]);
      }
    }
  }

  walk(obj);
  return [...new Set(images)];
}

/**
 * แกะข้อมูลโพสต์จาก JSON ภายในหน้าเว็บ Facebook Modern UI
 * รวมข้อมูลข้อความและรูปภาพของโพสต์เดียวกันเข้าด้วยกันอย่างสมบูรณ์
 */
function extractPostsFromModernFB(html) {
  const storyMap = new Map(); // id -> { id, message, created_time, images }

  const scriptRegex = /<script\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;

  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    const content = scriptMatch[1];
    if (content.includes('message') || content.includes('creation_time') || content.includes('post_id')) {
      try {
        const json = JSON.parse(content);
        collectStories(json, storyMap);
      } catch (_) {}
    }
  }

  const posts = [];
  for (const [id, story] of storyMap.entries()) {
    // ต้องมีข้อความโพสต์จึงนำมาแปลงเป็นข่าว 1 ข่าว
    if (story.message && story.message.trim().length > 0) {
      posts.push({
        id: `fb_${id}`,
        numericId: id,
        message: story.message,
        created_time: story.created_time || new Date().toISOString().split('T')[0],
        image_url: story.images[0] || '',
        gallery_urls: story.images.slice(1),
        permalink: `https://www.facebook.com/${FB_TARGET_ID}/posts/${id}`
      });
    }
  }

  return posts;
}

/**
 * ค้นหาและ Merge ข้อมูล Story Node
 */
function collectStories(obj, storyMap) {
  if (!obj || typeof obj !== 'object') return;

  // หา ID ของโพสต์
  let rawId = obj.post_id || (obj.message && obj.id);
  let id = null;

  if (rawId && typeof rawId === 'string') {
    const digits = rawId.match(/([0-9]{12,})/);
    if (digits) {
      id = digits[1];
    }
  }

  if (id) {
    if (!storyMap.has(id)) {
      storyMap.set(id, {
        id,
        message: '',
        created_time: '',
        images: []
      });
    }

    const current = storyMap.get(id);

    // ดึงข้อความถ้ายังไม่มี
    if (!current.message && obj.message && obj.message.text) {
      current.message = obj.message.text;
    }

    // ดึงวันที่ถ้ามี
    if (!current.created_time && obj.creation_time) {
      current.created_time = new Date(obj.creation_time * 1000).toISOString().split('T')[0];
    }

    // ดึงรูปภาพ
    const foundImages = extractImagesFromObject(obj);
    if (foundImages.length > 0) {
      current.images = [...new Set([...current.images, ...foundImages])];
    }
  }

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      collectStories(obj[key], storyMap);
    }
  }
}

/**
 * ดาวน์โหลดรูปภาพจาก Facebook CDN แล้วเซฟลงไฟล์ใน public/news/
 * คืนค่า path ที่สัมพันธ์กับ public เช่น "news/fb_12345.jpg"
 * ถ้ารูปมีอยู่แล้วจะข้ามไป (ไม่ดาวน์โหลดซ้ำ)
 */
async function downloadFacebookImage(imageUrl, postId) {
  if (!imageUrl || !imageUrl.includes('scontent')) return '';

  // สร้างชื่อไฟล์จาก post ID
  const filename = `fb_${postId}.jpg`;
  const filePath = path.join(NEWS_IMG_DIR, filename);

  // ถ้ามีรูปอยู่แล้ว ไม่ต้องดาวน์โหลดซ้ำ
  if (fs.existsSync(filePath)) {
    console.log(`📷 [Skip] รูปภาพมีอยู่แล้ว: ${filename}`);
    return `news/${filename}`;
  }

  try {
    console.log(`📥 [Download] กำลังดาวน์โหลดรูปภาพ: ${filename}...`);
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      console.log(`⚠️ [Download Failed] ไม่สามารถดาวน์โหลดรูป ${filename}: HTTP ${res.status}`);
      return '';
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // ต้องมีขนาดอย่างน้อย 5KB ถึงจะเป็นรูปจริง (ไม่ใช่ placeholder)
    if (buffer.length < 5000) {
      console.log(`⚠️ [Skip Tiny] รูปเล็กเกินไป (${buffer.length} bytes), ข้ามไป: ${filename}`);
      return '';
    }

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    if (!fs.existsSync(NEWS_IMG_DIR)) {
      fs.mkdirSync(NEWS_IMG_DIR, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);
    console.log(`✅ [Downloaded] เซฟรูปภาพสำเร็จ: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return `news/${filename}`;
  } catch (err) {
    console.log(`⚠️ [Download Error] ${filename}: ${err.message}`);
    return '';
  }
}

/**
 * บันทึกหรืออัปเดตโพสต์ลงใน Supabase ตรงไปยัง school_portal_data
 */
async function syncPostsToSupabase(posts) {
  console.log(`\n📡 [Supabase] กำลังดึงข้อมูลข่าวเดิมจาก Supabase...`);

  const selectUrl = `${SUPABASE_URL}/rest/v1/school_portal_data?key=eq.news&select=value`;
  const getRes = await fetch(selectUrl, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!getRes.ok) {
    throw new Error(`Failed to fetch current news from Supabase: ${getRes.statusText}`);
  }

  const data = await getRes.json();
  let currentNews = (data && data[0] && Array.isArray(data[0].value)) ? data[0].value : [];

  // ลบข่าวขยะที่ไม่มีข้อความออก (เหลือเฉพาะข่าวที่มีข้อความสมบูรณ์และข่าวระบบเดิม)
  currentNews = currentNews.filter(n => {
    if (n.id && n.id.startsWith('fb_')) {
      // ถ้าเป็นโพสต์ Facebook แต่ไม่มีข้อความ หรือมีแค่ข้อความ boilerplate ให้เอาออก
      if (!n.content || n.content.includes('ติดตามภาพกิจกรรมเพิ่มเติม') || n.title.includes('ภาพกิจกรรม โรงเรียนบ้านวังหัวแหวนพั')) {
        return false;
      }
    }
    return true;
  });

  // =====================================================================
  // นโยบายตัดรอบ 1 ปีการศึกษา (Academic Year Auto-Pruning Policy)
  // ลบข่าวที่เก่ากว่า 1 ปีการศึกษา (365 วัน) โดยอัตโนมัติ (ยกเว้นข่าวปักหมุด)
  // =====================================================================
  const ONE_ACADEMIC_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const initialNewsCount = currentNews.length;

  currentNews = currentNews.filter(item => {
    // ข่าวที่แอดมินปักหมุดไว้ (isPinned) จะถูกเก็บไว้เสมอ
    if (item.isPinned) return true;

    if (!item.date) return true;
    const postTime = new Date(item.date).getTime();
    if (isNaN(postTime)) return true;

    const ageMs = now - postTime;
    if (ageMs > ONE_ACADEMIC_YEAR_MS) {
      console.log(`🗑️ [Auto Prune] ลบข่าวเก่าเกิน 1 ปีการศึกษา: "${item.title.substring(0, 35)}..." (${item.date})`);
      return false;
    }
    return true;
  });

  let changesMade = (currentNews.length !== initialNewsCount);

  for (const post of posts) {
    const existingIndex = currentNews.findIndex(n => {
      if (n.id === post.id) return true;
      if (post.numericId && n.id && n.id.includes(post.numericId)) return true;
      return false;
    });

    // สร้างหัวข้อและคำโปรยจากข้อความ
    let title = 'ภาพกิจกรรม โรงเรียนบ้านวังหัวแหวนพัฒนา';
    let subtitle = 'กิจกรรมและการดำเนินงานของโรงเรียน';
    let content = post.message || '';

    if (post.message && post.message.trim().length > 0) {
      const lines = post.message.trim().split('\n').filter(l => l.trim().length > 0);
      title = lines[0].trim();
      if (title.length > 120) {
        title = title.substring(0, 117) + '...';
      }
      if (lines.length > 1) {
        subtitle = lines[1].trim();
        if (subtitle.length > 150) {
          subtitle = subtitle.substring(0, 147) + '...';
        }
      } else {
        subtitle = post.message.trim().substring(0, 140);
      }
    }

    // ดาวน์โหลดรูปภาพจริงจาก Facebook CDN ลงไฟล์ (ถ้ามี)
    const localImagePath = await downloadFacebookImage(post.image_url, post.numericId);

    // ดาวน์โหลดรูป gallery (ถ้ามี) — เก็บแค่ 4 รูปแรก
    const galleryPaths = [];
    for (let i = 0; i < Math.min(post.gallery_urls.length, 4); i++) {
      const gPath = await downloadFacebookImage(post.gallery_urls[i], `${post.numericId}_g${i + 1}`);
      if (gPath) galleryPaths.push(gPath);
    }

    const newItem = {
      id: post.id,
      title: title,
      subtitle: subtitle,
      content: content,
      date: post.created_time || new Date().toISOString().split('T')[0],
      category: 'activity',
      imageUrl: localImagePath,  // ใช้ path ของไฟล์ local แทน CDN link
      author: 'เพจโรงเรียนบ้านวังหัวแหวนพัฒนา',
      isPinned: false,
      status: 'published',
      views: 0,
      attachmentName: '',
      attachmentUrl: '',
      galleryUrls: galleryPaths.join(','),
      fbUrl: post.permalink
    };

    if (existingIndex !== -1) {
      // โพสต์มีอยู่แล้ว: รวมข้อมูลให้สมบูรณ์
      const existing = currentNews[existingIndex];
      const bestImage = localImagePath || existing.imageUrl || '';
      const bestGallery = galleryPaths.length > 0 ? galleryPaths.join(',') : (existing.galleryUrls || '');

      console.log(`🖼️ [Supabase Update] อัปเดตข่าว: "${title.substring(0, 35)}..." รูป: ${bestImage || 'ไม่มี'}`);
      currentNews[existingIndex] = {
        ...existing,
        id: post.id,
        title: title,
        subtitle: subtitle,
        content: content,
        imageUrl: bestImage,
        galleryUrls: bestGallery,
        fbUrl: post.permalink
      };
      changesMade = true;
    } else {
      // โพสต์ใหม่: แทรกไว้ด้านบนสุด
      console.log(`✨ [Supabase Insert] เพิ่มข่าวใหม่: "${title.substring(0, 35)}..." รูป: ${localImagePath || 'ไม่มี (แสดงเป็นข้อความ)'}`);
      currentNews.unshift(newItem);
      changesMade = true;
    }
  }

  // เซฟกลับขึ้น Supabase
  console.log(`\n💾 [Supabase Save] กำลังบันทึกข่าวกลับขึ้น Supabase (${currentNews.length} รายการ)...`);
  const updateUrl = `${SUPABASE_URL}/rest/v1/school_portal_data`;
  const saveRes = await fetch(updateUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify({
      key: 'news',
      value: currentNews,
      updated_at: new Date().toISOString()
    })
  });

  if (!saveRes.ok) {
    const errText = await saveRes.text();
    throw new Error(`Failed to save news to Supabase: ${errText}`);
  }

  console.log(`✅ [Supabase Success] บันทึกข่าวลงฐานข้อมูล Supabase สำเร็จเรียบร้อย!`);
}

/**
 * Main Controller
 */
async function main() {
  console.log('====================================================');
  console.log('🚀 เริ่มต้นดึงข้อมูลโพสต์และรูปภาพ Facebook ของโรงเรียน...');
  console.log(`🎯 Target Facebook ID: ${FB_TARGET_ID}`);
  console.log(`📡 Supabase Endpoint: ${SUPABASE_URL}`);
  console.log(`📁 Image Directory: ${NEWS_IMG_DIR}`);
  console.log('====================================================\n');

  // สร้างโฟลเดอร์เก็บรูปถ้ายังไม่มี
  if (!fs.existsSync(NEWS_IMG_DIR)) {
    fs.mkdirSync(NEWS_IMG_DIR, { recursive: true });
  }

  let posts = [];

  try {
    const webRes = await fetchWithRedirects(`https://www.facebook.com/${FB_TARGET_ID}`);
    if (webRes.status === 200) {
      posts = extractPostsFromModernFB(webRes.text);
      console.log(`✅ พบโพสต์จาก Modern UI จำนวน ${posts.length} โพสต์`);

      // แสดงสรุป
      for (const p of posts) {
        console.log(`  📝 [${p.id}] ${p.message.substring(0, 50)}... | รูป: ${p.image_url ? 'มี' : 'ไม่มี'} | Gallery: ${p.gallery_urls.length}`);
      }
    }
  } catch (err) {
    console.log(`⚠️ ดึงจาก Facebook ไม่สำเร็จ: ${err.message}`);
  }

  if (posts.length === 0) {
    console.log('\n⚠️ ไม่พบโพสต์ใหม่จาก Facebook');
    // ถึงไม่พบโพสต์ใหม่ ก็ยังต้อง sync เพื่อ prune ข่าวเก่า
    await syncPostsToSupabase([]);
    return;
  }

  // ส่งข้อมูลเข้า Supabase
  await syncPostsToSupabase(posts);

  console.log('\n🎉 ดำเนินการเสร็จสมบูรณ์ 100%!');
}

main().catch(err => {
  console.error('\n❌ เกิดข้อผิดพลาดร้ายแรง:', err);
  process.exit(1);
});
