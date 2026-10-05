// Node 24 native fetch

async function check() {
  const res = await fetch('https://rsukgfvutcagkpcfatfw.supabase.co/rest/v1/school_portal_data?key=eq.news&select=value', {
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWtnZnZ1dGNhZ2twY2ZhdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzQwODEsImV4cCI6MjA5OTA1MDA4MX0.YoIDvfwtSM-jO32vbRvsmV7mRzNd3UEB0epIAeAxyZ0'
    }
  });
  const data = await res.json();
  const news = data[0].value;
  console.log('Total news in Supabase:', news.length);
  for (let i = 0; i < news.length; i++) {
    const n = news[i];
    console.log(`\n================== [${i}] ${n.id} ==================`);
    console.log(`Title: ${n.title}`);
    console.log(`Date: ${n.date}`);
    console.log(`Image: ${n.imageUrl}`);
    console.log(`Gallery: ${n.galleryUrls}`);
    console.log(`Content: ${n.content ? n.content.substring(0, 100) : ''}...`);
  }
}
check();
