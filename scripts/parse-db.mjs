/**
 * Parse CIC MySQL dump → JSON for Next.js
 * Simple regex-based approach (proven to work with 231 news)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SQL_FILE = join(__dirname, '..', 'cic14005_cic_fs_2026-04-12_14-16-36.sql');
const OUT_DIR = join(__dirname, '..', 'data');
mkdirSync(OUT_DIR, { recursive: true });

const sql = readFileSync(SQL_FILE, 'utf-8');

// ===== Alias → Vietnamese Name Mapping =====
const CATEGORY_MAP = {
  'xay-dung': 'Xây dựng', 'giao-thong': 'Giao thông', 'thuy-loi': 'Thuỷ lợi',
  'dau-khi': 'Dầu khí', 'moi-truong': 'Môi trường', 'co-khi-che-tao': 'Cơ khí chế tạo',
  'giao-duc-dao-tao': 'Giáo dục & Đào tạo', 'an-ninh-quan-su': 'An ninh & Quân sự',
  'noi-that-vat-lieu-xay-dung': 'Nội thất & VLXD', 'dien-luc': 'Điện lực',
  'mo-khai-khoang': 'Mỏ & Khai khoáng', 'van-phong': 'Văn phòng',
  'dia-vat-ly': 'Địa vật lý', 'khac': 'Khác',
};

const NEWS_CAT_MAP = {
  'Tin chuyên ngành': 'Chuyên ngành', 'Tin công ty': 'Tin công ty',
  'Tin tuyển dụng': 'Tuyển dụng', 'Quan hệ cổ đông': 'Cổ đông',
  'Thông báo cổ đông': 'Cổ đông', 'Tin phần mềm trong nước': 'Phần mềm',
  'Điều lệ công ty': 'Công ty', 'Tin khuyến mại': 'Khuyến mại',
};

function resolveImg(img) {
  if (!img) return null;
  if (img.startsWith('http')) return img;
  if (img.startsWith('/')) return `https://cic.com.vn${img}`;
  return `https://cic.com.vn/${img}`;
}

function stripHtml(h) {
  if (!h) return '';
  return h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}

function fmtDate(dt) {
  if (!dt) return null;
  const d = new Date(dt);
  return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

/**
 * Simple row extraction: find INSERT, split by ),(
 */
function getInsertData(tableName) {
  const re = new RegExp(`INSERT INTO \`${tableName}\` VALUES \\((.+?)\\);`, 'gs');
  const all = [];
  for (const m of sql.matchAll(re)) {
    const raw = m[1];
    const rows = raw.split('),(');
    all.push(...rows);
  }
  return all;
}

/**
 * Simple field parser
 */
function parseRow(raw) {
  const fields = [];
  let cur = '', inStr = false, esc = false;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (esc) { cur += c; esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === "'" && !inStr) { inStr = true; continue; }
    if (c === "'" && inStr) { inStr = false; continue; }
    if (c === ',' && !inStr) { fields.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  fields.push(cur.trim());
  return fields.map(f => f === 'NULL' ? null : f);
}

// ========== NEWS ==========
console.log('📰 Processing news...');
const newsRows = getInsertData('fs_news');
const news = [];
for (const raw of newsRows) {
  const f = parseRow(raw);
  const title = f[10];
  const published = f[24];
  if (!title || published !== '1') continue;
  
  const catName = f[6] || '';
  const summary = stripHtml(f[1] || '');
  
  news.push({
    id: parseInt(f[0]),
    title,
    slug: f[11] || `news-${f[0]}`,
    summary: summary.substring(0, 300),
    content: f[2] || '',
    category: NEWS_CAT_MAP[catName] || catName || 'Tin tức',
    image: resolveImg(f[12]),
    creator: f[14],
    date: fmtDate(f[16]),
    hits: parseInt(f[23]) || 0,
    seoTitle: f[33] || title,
    seoDescription: (f[35] || summary).substring(0, 160),
  });
}
news.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
console.log(`  → ${news.length} articles`);

// Listing (no content)
writeFileSync(join(OUT_DIR, 'news-listing.json'), JSON.stringify(
  news.map(({ content, ...r }) => r), null, 2
), 'utf-8');

// Full (with content for detail pages)
writeFileSync(join(OUT_DIR, 'news-full.json'), JSON.stringify(news, null, 2), 'utf-8');

// ========== PRODUCT CATEGORIES ==========
console.log('📁 Processing product categories...');
const catRows = getInsertData('fs_products_categories');
const categories = [];
for (const raw of catRows) {
  const f = parseRow(raw);
  const alias = f[4];
  const pub = f[6];
  if (!alias || pub !== '1') continue;
  categories.push({
    id: parseInt(f[0]),
    name: CATEGORY_MAP[alias] || alias,
    alias,
    ordering: parseInt(f[9]) || 0,
    image: resolveImg(f[7]),
  });
}
categories.sort((a, b) => a.ordering - b.ordering);
console.log(`  → ${categories.length} categories`);
writeFileSync(join(OUT_DIR, 'product-categories.json'), JSON.stringify(categories, null, 2), 'utf-8');

// ========== PRODUCTS ==========
console.log('📦 Processing products...');
const prodRows = getInsertData('fs_products');
const products = [];
for (const raw of prodRows) {
  const f = parseRow(raw);
  if (f[24] !== '1') continue;
  const catAlias = f[8];
  products.push({
    id: parseInt(f[0]),
    name: f[1],
    code: f[2],
    slug: f[3],
    categoryAlias: catAlias,
    categoryName: CATEGORY_MAP[catAlias] || f[7] || '',
    summary: stripHtml(f[11] || '').substring(0, 300),
    description: f[12] || '',
    image: resolveImg(f[13]),
    date: fmtDate(f[22]),
    hits: parseInt(f[26]) || 0,
    isHot: f[36] === '1',
  });
}
console.log(`  → ${products.length} products`);
writeFileSync(join(OUT_DIR, 'products.json'), JSON.stringify(products, null, 2), 'utf-8');

// ========== SUMMARY ==========
const cats = {};
news.forEach(n => { cats[n.category] = (cats[n.category] || 0) + 1; });
console.log('\n✅ Export complete!');
console.log(`   📰 News: ${news.length} (${Object.entries(cats).map(([k,v]) => `${k}: ${v}`).join(', ')})`);
console.log(`   📁 Product Categories: ${categories.length}`);
console.log(`   📦 Products: ${products.length}`);
