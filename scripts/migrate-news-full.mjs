import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'news-full.json');

// Configuration
const SUPABASE_URL = 'https://jyohocjsnsyfgfsmjfqx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5b2hvY2pzbnN5Zmdmc21qZnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTExODMsImV4cCI6MjA4NDk4NzE4M30.zV5sf6Pso4LX4kRV6bBIEahCu6qIP1GJO505AbYR1n0'; // Anon key from .env.local
const BUCKET_NAME = 'documents';

// Categories mapping to uuids in cms_categories
const catNameToId = {
  'Tin công ty': 'b1f1719f-323b-4112-9f60-0aad700cafd0',
  'Chuyên ngành': '8ee8b8bd-da21-4eb7-aa80-54df63fdc5fb',
  'Tin chuyên ngành': '8ee8b8bd-da21-4eb7-aa80-54df63fdc5fb',
  'Khuyến mại': '2ecfc786-80bc-46d1-80d0-7a081e48432f',
  'Khuyến mãi': '2ecfc786-80bc-46d1-80d0-7a081e48432f',
  'Tuyển dụng': '7aa50f45-5304-4952-9998-0be744a85064',
  'Cổ đông': '4ce75c72-caef-4378-a3e1-933d04ef16ad',
  'Quan hệ cổ đông': '4ce75c72-caef-4378-a3e1-933d04ef16ad',
  'Sự kiện': 'aa13b615-ef95-45db-834b-bf7faa52212f',
  'Tin phần mềm': 'd7424601-a4fe-4442-98c8-359c2a5e2ec5',
  'Điều lệ công ty': '4b0ae5a1-2d19-4a71-8df8-dd2a8c208c68',
  'Công ty': 'b1f1719f-323b-4112-9f60-0aad700cafd0',
  'Thông báo cổ đông': 'd79537cd-e364-45a2-af96-57fd17c3673b',
  'Tin tức': 'b1f1719f-323b-4112-9f60-0aad700cafd0' // fallback
};

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function generateUUID(idInt) {
  // deterministic padding to v4-like uuid from integer id for idempotent upserts
  return '00000000-0000-0000-0000-' + String(idInt).padStart(12, '0');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('📰 Loading news JSON...');
  const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  console.log(`Loaded ${data.length} records.`);

  console.log('🗑️ Emptying existing records in cms_posts (RLS is disabled)...');
  const { error: delErr } = await supabase.from('cms_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delErr) {
    console.error('Error emptying cms_posts:', delErr);
    // Proceed anyway, we use deterministic UUIDs
  }

  let successCount = 0;
  let imgCount = 0;
  let fallbackCount = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let thumbnail_url = null;

    if (item.image) {
      try {
        console.log(`[${i+1}/${data.length}] Downloading image: ${item.image}`);
        const res = await fetch(item.image);
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          // parse filename
          const filename = item.image.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_');
          const path = `news/${item.id}_${filename}`;

          // upload to supabase
          const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(path, buffer, {
              upsert: true,
              cacheControl: '3600'
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
            thumbnail_url = publicUrlData.publicUrl;
            imgCount++;
          } else {
            console.error('  -> Upload error:', uploadError.message);
            // fallback to original
            thumbnail_url = item.image;
            fallbackCount++;
          }
        } else {
          console.error(`  -> Failed to fetch image: ${res.status} ${res.statusText}`);
          thumbnail_url = item.image;
          fallbackCount++;
        }
      } catch (err) {
        console.error(`  -> Fetch error: ${err.message}`);
        thumbnail_url = item.image;
        fallbackCount++;
      }
    }

    const category_id = catNameToId[item.category] || catNameToId['Tin tức'];
    const record = {
      id: generateUUID(item.id),
      title_vi: item.title || '',
      slug: item.slug || `tin-tuc-${item.id}`,
      excerpt_vi: item.summary,
      content_vi: item.content,
      thumbnail_url: thumbnail_url,
      category_id: category_id,
      status: 'published',
      published_at: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
      seo_title_vi: item.seoTitle,
      seo_description_vi: item.seoDescription,
      view_count: item.hits,
      author_name: item.creator || 'Admin'
    };

    const { error: insertErr } = await supabase.from('cms_posts').upsert(record);
    if (insertErr) {
      console.error(`❌ Failed to insert article ${item.id}:`, insertErr.message);
    } else {
      successCount++;
      console.log(`✅ Inserted: ${item.title}`);
    }
    
    // Add a small delay to avoid rate limiting
    await delay(200);
  }

  console.log('\\n🎉 Migration Complete!');
  console.log(`Inserted ${successCount} articles.`);
  console.log(`Uploaded ${imgCount} images to Supabase.`);
  console.log(`Fell back to ${fallbackCount} original legacy URLs.`);
}

run();
