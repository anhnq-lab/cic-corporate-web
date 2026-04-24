// ============================================
// CIC Corporate Web — Type Definitions
// Mapped to CIC-ERP Supabase CMS Schema
// ============================================

// ── CMS Categories ──────────────────────────
export interface CmsCategory {
  id: string;
  name_vi: string;
  name_en: string | null;
  slug: string;
  description_vi: string | null;
  description_en: string | null;
  type: 'news' | 'product' | 'service';
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  image_url: string | null;
  seo_title_vi: string | null;
  seo_description_vi: string | null;
}

// ── CMS Posts (Tin tức) ─────────────────────
export interface CmsPost {
  id: string;
  title_vi: string;
  title_en: string | null;
  slug: string;
  excerpt_vi: string | null;
  excerpt_en: string | null;
  content_vi: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
  category_id: string | null;
  author_name: string | null;
  status: string;
  is_featured: boolean;
  published_at: string | null;
  view_count: number;
  seo_title_vi: string | null;
  seo_description_vi: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  // Joined
  cms_categories?: CmsCategory;
}

// ── Products (từ ERP products table) ────────
export interface ErpProduct {
  id: string;
  code: string | null;
  name: string;
  slug: string | null;
  category: string | null;
  description: string | null;
  content: string | null;
  summary: string | null;
  thumbnail_url: string | null;
  gallery_urls: string[] | null;
  category_id: string | null;
  product_line: string | null;
  edition: string | null;
  license_type: string | null;
  base_price: number | null;
  is_active: boolean;
  is_published_web: boolean;
  is_featured_web: boolean;
  view_count: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  cms_categories?: CmsCategory;
}

// Backward compat alias
export type CmsProduct = ErpProduct;

// ── CMS Services (Dịch vụ) ─────────────────
export interface CmsService {
  id: string;
  name_vi: string;
  name_en: string | null;
  slug: string;
  description_vi: string | null;
  description_en: string | null;
  content_vi: string | null;
  content_en: string | null;
  icon_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  sort_order: number;
  seo_title_vi: string | null;
  seo_description_vi: string | null;
  created_at: string;
  updated_at: string;
}

// ── CMS Partners (Đối tác) ─────────────────
export interface CmsPartner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
}

// ── CMS Banners ─────────────────────────────
export interface CmsBanner {
  id: string;
  title_vi: string | null;
  title_en: string | null;
  subtitle_vi: string | null;
  subtitle_en: string | null;
  image_url: string;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
}

// ── CMS Events ──────────────────────────────
export interface CmsEvent {
  id: string;
  title_vi: string;
  title_en: string | null;
  slug: string;
  excerpt_vi: string | null;
  content_vi: string | null;
  thumbnail_url: string | null;
  category_id: string | null;
  status: string;
  is_featured: boolean;
  published_at: string | null;
  view_count: number;
}

// ── CMS Settings ────────────────────────────
export interface CmsSetting {
  id: string;
  key: string;
  value: string;
}

// ── Projects (từ ERP) ───────────────────────
export interface ProjectWeb {
  id: string;
  name: string;
  slug: string | null;
  location: string | null;
  thumbnail_url: string | null;
  web_category: string | null;
  web_client_name: string | null;
  web_stats: string | null;
  is_published_web: boolean;
  is_featured_web: boolean;
}

// ── Job Openings (từ ERP) ───────────────────
export interface JobOpening {
  id: string;
  title: string;
  slug: string | null;
  department: string | null;
  quantity: number;
  hired_count: number;
  job_type: string | null;
  experience_level: string | null;
  salary_range_min: number | null;
  salary_range_max: number | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  status: string;
  priority: string;
  deadline: string | null;
  location: string | null;
  is_published_web: boolean;
  view_count: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

// ── Contact Submissions ─────────────────────
export interface ContactSubmission {
  full_name: string;
  phone?: string;
  email: string;
  company?: string;
  message?: string;
  product_slug?: string;
}

// ── Navigation ──────────────────────────────
export interface NavItem {
  id?: string;
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

// ── CMS Product Domains ─────────────────────
export interface CmsProductDomain {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
}

// ── CMS Milestones ──────────────────────────
export interface CmsMilestone {
  id: string;
  year: string;
  event: string;
  sort_order: number;
}

// ── CMS Core Values ─────────────────────────
export interface CmsCoreValue {
  id: string;
  title: string;
  description: string;
  sort_order: number;
}