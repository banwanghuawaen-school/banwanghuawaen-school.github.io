/**
 * ==============================================================================
 * สคริปต์ดึงโพสต์จาก Facebook ของโรงเรียนเข้าสู่ Supabase อัตโนมัติ
 * ทำงานบน GitHub Actions ทุกๆ 1-2 ชั่วโมง หรือสั่งรันแบบ Manual
 * ==============================================================================
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rsukgfvutcagkpcfatfw.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWtnZnZ1dGNhZ2twY2ZhdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzQwODEsImV4cCI6MjA5OTA1MDA4MX0.YoIDvfwtSM-jO32vbRvsmV7mRzNd3UEB0epIAeAxyZ0';
const FB_TARGET_ID = process.env.FB_TARGET_ID || '100057502268064';
const FB_COOKIE = process.env.FB_COOKIE || '';

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
 * แกะข้อมูลโพสต์จากหน้า mbasic / mobile Facebook
 */
function extractPostsFromMbasic(html) {
  const posts = [];

  // มองหารูปแบบ story_fbid หรือ fbid ในลิงก์
  const storyRegex = /(?:story\.php\?story_fbid=([0-9]+)|fbid=([0-9]+))/gi;
  let match;
  const foundFbidSet = new Set();

  while ((match = storyRegex.exec(html)) !== null) {
    const fbid = match[1] || match[2];
    if (fbid && !foundFbidSet.has(fbid)) {
      foundFbidSet.add(fbid);
    }
  }

  // แยกบล็อกโพสต์ออกมา
  const articleBlocks = html.split(/<article\b[^>]*>|<div\s+role="article"/i).slice(1);
  for (let i = 0; i < articleBlocks.length && posts.length < 5; i++) {
    const block = articleBlocks[i];

    // ค้นหา ID
    const idMatch = block.match(/(?:story_fbid=([0-9]+)|fbid=([0-9]+)|top_level_post_id\.([0-9]+))/i);
    const id = idMatch ? (idMatch[1] || idMatch[2] || idMatch[3]) : `fb_${Date.now()}_${i}`;

    // ค้นหาข้อความในโพสต์ (ลบแท็ก HTML ทั้งหมด)
    let text = '';
    const pMatch = block.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      text = pMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } else {
      // ดึงจาก div ข้อความ
      const cleanBlock = block.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
                              .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
      const textMatch = cleanBlock.match(/>([^<]{20,})</);
      if (textMatch) {
        text = textMatch[1].trim();
      }
    }

    // ค้นหารูปภาพประกอบ
    let imageUrl = '';
    const imgMatch = block.match(/src="([^"]*scontent[^"]*)"/i) || block.match(/src="([^"]*fbcdn\.net[^"]*)"/i);
    if (imgMatch) {
      imageUrl = imgMatch[1].replace(/&amp;/g, '&');
    }

    if (text || imageUrl) {
      posts.push({
        id: `fb_${id}`,
        message: text || 'ภาพกิจกรรม โรงเรียนบ้านวังหัวแหวนพัฒนา',
        created_time: new Date().toISOString(),
        image_url: imageUrl,
        permalink: `https://www.facebook.com/${FB_TARGET_ID}/posts/${id}`
      });
    }
  }

  return posts;
}

/**
 * แกะข้อมูลโพสต์จาก JSON / GraphQL ภายในหน้าเว็บ Facebook Modern UI
 */
function extractPostsFromModernFB(html) {
  const posts = [];
  const seenIds = new Set();

  // 1. ค้นหา script data-sjs ที่มีข้อมูล JSON โพสต์
  const scriptRegex = /<script\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;

  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    const content = scriptMatch[1];
    if (content.includes('message') || content.includes('creation_time') || content.includes('story')) {
      try {
        const json = JSON.parse(content);
        findStoriesInJson(json, posts, seenIds);
      } catch (_) {
        // บาง script เป็น JSON แฝงหรือมีฟอร์แมตเฉพาะ
      }
    }
  }

  // 2. Fallback: ถ้าไม่พบใน JSON ให้ใช้ Regex สแกนหาข้อความและรูปภาพล่าสุด
  if (posts.length === 0) {
    const textMatches = [...html.matchAll(/"message":\s*\{\s*"text":\s*"([^"]+)"/g)];
    const imgMatches = [...html.matchAll(/https:\/\/scontent[^"'\s\\]+\.jpg[^"'\s\\]*/g)];

    if (textMatches.length > 0) {
      for (let i = 0; i < Math.min(textMatches.length, 3); i++) {
        let msg = textMatches[i][1];
        try {
          msg = JSON.parse(`"${msg}"`);
        } catch (_) {}

        const img = imgMatches[i] ? imgMatches[i][0].replace(/\\u0025/g, '%').replace(/\\/g, '') : '';
        const id = `fb_parsed_${Date.now()}_${i}`;

        posts.push({
          id,
          message: msg,
          created_time: new Date().toISOString(),
          image_url: img,
          permalink: `https://www.facebook.com/${FB_TARGET_ID}`
        });
      }
    }
  }

  return posts;
}

/**
 * ค้นหา Story Node ใน JSON tree
 */
function findStoriesInJson(obj, posts, seenIds) {
  if (!obj || typeof obj !== 'object' || posts.length >= 5) return;

  if (obj.post_id || (obj.message && obj.message.text)) {
    const id = obj.post_id || obj.id || `fb_${Date.now()}_${posts.length}`;
    if (!seenIds.has(id)) {
      seenIds.add(id);
      let text = obj.message && obj.message.text ? obj.message.text : '';
      let date = obj.creation_time ? new Date(obj.creation_time * 1000).toISOString() : new Date().toISOString();
      let img = '';

      if (obj.attachments && obj.attachments[0] && obj.attachments[0].media) {
        img = obj.attachments[0].media.image ? obj.attachments[0].media.image.uri : '';
      }

      if (text || img) {
        posts.push({
          id: `fb_${id}`,
          message: text,
          created_time: date,
          image_url: img,
          permalink: `https://www.facebook.com/${FB_TARGET_ID}/posts/${id}`
        });
      }
    }
  }

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      findStoriesInJson(obj[key], posts, seenIds);
    }
  }
}

/**
 * บันทึกโพสต์เข้า Supabase RPC
 */
async function sendToSupabase(post) {
  const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/append_facebook_news`;
  console.log(`[Supabase] กำลังส่งข่าว: "${post.message.substring(0, 40)}..." (ID: ${post.id})`);

  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      p_id: post.id,
      p_message: post.message,
      p_created_time: post.created_time,
      p_image_url: post.image_url,
      p_permalink: post.permalink
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[Supabase Error ${res.status}] ${errText}`);
    return false;
  }

  const data = await res.json();
  console.log(`[Supabase Result] ${data.action || 'success'}: ${data.message || 'บันทึกเรียบร้อย'}`);
  return true;
}

/**
 * Main Controller
 */
async function main() {
  console.log('====================================================');
  console.log('🚀 เริ่มต้นดึงข้อมูลโพสต์ Facebook ของโรงเรียน...');
  console.log(`🎯 Target Facebook ID: ${FB_TARGET_ID}`);
  console.log(`📡 Supabase Endpoint: ${SUPABASE_URL}`);
  console.log(`🔑 Cookie Status: ${FB_COOKIE ? 'มี Cookie ในระบบ (พร้อมทำงาน)' : '⚠️ ไม่มี FB_COOKIE ใน Environment'}`);
  console.log('====================================================\n');

  if (!FB_COOKIE) {
    console.log('ℹ️ คำแนะนำ: หาก Facebook ต้องการการยืนยันตัวตน โปรดเพิ่ม FB_COOKIE ใน GitHub Secrets');
    console.log('   (ดูวิธีคัดลอก Cookie จากบราวเซอร์ได้ในคู่มือด้านล่าง)\n');
  }

  let posts = [];

  // ลองดึงจาก mbasic.facebook.com ก่อน (เบาและแกะข่าวง่ายที่สุด)
  try {
    console.log('📌 1. ทดลองดึงจาก mbasic.facebook.com...');
    const mbasicRes = await fetchWithRedirects(`https://mbasic.facebook.com/${FB_TARGET_ID}`);
    if (mbasicRes.status === 200) {
      posts = extractPostsFromMbasic(mbasicRes.text);
      console.log(`✅ พบโพสต์จาก mbasic จำนวน ${posts.length} โพสต์`);
    }
  } catch (err) {
    console.log(`⚠️ ดึงจาก mbasic ไม่สำเร็จ: ${err.message}`);
  }

  // หาก mbasic ไม่ได้ผล ลองดึงจากหน้า www.facebook.com
  if (posts.length === 0) {
    try {
      console.log('\n📌 2. ทดลองดึงจาก www.facebook.com...');
      const webRes = await fetchWithRedirects(`https://www.facebook.com/${FB_TARGET_ID}`);
      if (webRes.status === 200) {
        posts = extractPostsFromModernFB(webRes.text);
        console.log(`✅ พบโพสต์จาก Modern UI จำนวน ${posts.length} โพสต์`);
      }
    } catch (err) {
      console.log(`⚠️ ดึงจาก www ไม่สำเร็จ: ${err.message}`);
    }
  }

  if (posts.length === 0) {
    console.log('\n⚠️ ไม่พบโพสต์ใหม่ หรือติดหน้า Login ของ Facebook');
    console.log('💡 โปรดตรวจสอบว่าได้ใส่ FB_COOKIE ใน GitHub Repository Secrets เรียบร้อยแล้ว');
    return;
  }

  console.log(`\n🎉 สรุป: พบข่าวที่ต้องส่งเข้าเว็บทั้งหมด ${posts.length} รายการ`);
  for (const post of posts) {
    await sendToSupabase(post);
  }

  console.log('\n✨ ดำเนินการเสร็จสมบูรณ์!');
}

main().catch(err => {
  console.error('\n❌ เกิดข้อผิดพลาดร้ายแรง:', err);
  process.exit(1);
});
