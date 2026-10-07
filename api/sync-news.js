/**
 * Vercel Serverless Function & Cron Job Handler
 * GET/POST /api/sync-news
 * ดึงโพสต์ล่าสุดจาก Facebook ของโรงเรียนเข้าสู่ Supabase อัตโนมัติ
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rsukgfvutcagkpcfatfw.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWtnZnZ1dGNhZ2twY2ZhdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzQwODEsImV4cCI6MjA5OTA1MDA4MX0.YoIDvfwtSM-jO32vbRvsmV7mRzNd3UEB0epIAeAxyZ0';
const FB_TARGET_ID = process.env.FB_TARGET_ID || '100057502268064';

async function fetchWithRedirects(url, headers = {}, maxRedirects = 5) {
  let currentUrl = url;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    const res = await fetch(currentUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
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
      currentUrl = location;
      redirectCount++;
    } else {
      const text = await res.text();
      return { status: res.status, headers: res.headers, text, finalUrl: currentUrl };
    }
  }

  throw new Error(`Too many redirects (exceeded ${maxRedirects})`);
}

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

function collectStories(obj, storyMap) {
  if (!obj || typeof obj !== 'object') return;
  let rawId = obj.post_id || (obj.message && obj.id);
  let id = null;

  if (rawId && typeof rawId === 'string') {
    const m = rawId.match(/(\d{12,})/);
    if (m) id = m[1];
  }

  if (id && !storyMap.has(id)) {
    storyMap.set(id, { id, message: '', created_time: '', images: [] });
  }

  const targetId = id || (obj.message ? (obj.id || String(Math.random())) : null);
  if (targetId && !storyMap.has(targetId)) {
    storyMap.set(targetId, { id: targetId, message: '', created_time: '', images: [] });
  }

  const currentStory = storyMap.get(id || targetId);
  if (currentStory) {
    if (obj.message && typeof obj.message === 'object' && obj.message.text) {
      if (!currentStory.message || obj.message.text.length > currentStory.message.length) {
        currentStory.message = obj.message.text;
      }
    } else if (typeof obj.message === 'string' && obj.message.trim().length > 0) {
      if (!currentStory.message || obj.message.length > currentStory.message.length) {
        currentStory.message = obj.message;
      }
    }

    if (obj.creation_time) {
      const ts = Number(obj.creation_time) * 1000;
      if (!isNaN(ts)) {
        currentStory.created_time = new Date(ts).toISOString().split('T')[0];
      }
    }

    const imgs = extractImagesFromObject(obj);
    for (const img of imgs) {
      if (!currentStory.images.includes(img)) {
        currentStory.images.push(img);
      }
    }
  }

  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      collectStories(obj[k], storyMap);
    }
  }
}

function extractPostsFromModernFB(html) {
  const storyMap = new Map();
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log(`[Vercel Sync] Starting Facebook News fetch for ID ${FB_TARGET_ID}...`);
    const webRes = await fetchWithRedirects(`https://www.facebook.com/${FB_TARGET_ID}`);
    let posts = [];

    if (webRes.status === 200) {
      posts = extractPostsFromModernFB(webRes.text);
      console.log(`[Vercel Sync] Scraped ${posts.length} posts from Modern UI.`);
    }

    // Get current news from Supabase
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
    let changesMade = false;

    for (const post of posts) {
      const existingIndex = currentNews.findIndex(n => {
        if (n.id === post.id) return true;
        if (post.numericId && n.id && n.id.includes(post.numericId)) return true;
        return false;
      });

      let title = 'ภาพกิจกรรม โรงเรียนบ้านวังหัวแหวนพัฒนา';
      let subtitle = 'กิจกรรมและการดำเนินงานของโรงเรียน';
      let content = post.message || '';

      if (post.message && post.message.trim().length > 0) {
        const lines = post.message.trim().split('\n').filter(l => l.trim().length > 0);
        title = lines[0].trim();
        if (title.length > 120) title = title.substring(0, 117) + '...';
        if (lines.length > 1) {
          subtitle = lines[1].trim();
          if (subtitle.length > 150) subtitle = subtitle.substring(0, 147) + '...';
        } else {
          subtitle = post.message.trim().substring(0, 140);
        }
      }

      // Local relative path (if committed to repo) or direct Facebook CDN URL
      const localImagePath = `news/fb_${post.numericId}.jpg`;
      const galleryPaths = post.gallery_urls.slice(0, 4).map((_, i) => `news/fb_${post.numericId}_g${i + 1}.jpg`);

      const newItem = {
        id: post.id,
        title: title,
        titleEn: title,
        subtitle: subtitle,
        subtitleEn: subtitle,
        content: content,
        contentEn: content,
        date: post.created_time || new Date().toISOString().split('T')[0],
        category: 'activity',
        imageUrl: localImagePath,
        fbImageUrl: post.image_url || '',
        author: 'เพจโรงเรียนบ้านวังหัวแหวนพัฒนา',
        isPinned: false,
        status: 'published',
        views: 0,
        attachmentName: '',
        attachmentUrl: '',
        galleryUrls: galleryPaths.join(','),
        fbGalleryUrls: post.gallery_urls.slice(0, 4).join(','),
        fbUrl: post.permalink
      };

      if (existingIndex !== -1) {
        const existing = currentNews[existingIndex];
        currentNews[existingIndex] = {
          ...existing,
          title: title,
          titleEn: existing.titleEn || title,
          subtitle: subtitle,
          subtitleEn: existing.subtitleEn || subtitle,
          content: content,
          contentEn: existing.contentEn || content,
          fbImageUrl: post.image_url || existing.fbImageUrl || '',
          fbGalleryUrls: post.gallery_urls.slice(0, 4).join(',') || existing.fbGalleryUrls || '',
          fbUrl: post.permalink
        };
        changesMade = true;
      } else {
        console.log(`[Vercel Sync] Inserting new post: ${title}`);
        currentNews.unshift(newItem);
        changesMade = true;
      }
    }

    if (changesMade) {
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
        throw new Error(`Failed to save to Supabase: ${await saveRes.text()}`);
      }
    }

    return res.status(200).json({
      success: true,
      scrapedCount: posts.length,
      totalNews: currentNews.length,
      changesMade,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Vercel Sync Error]', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      updatedAt: new Date().toISOString()
    });
  }
}
