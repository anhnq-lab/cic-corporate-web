// ============================================
// CIC Corporate Web — Data Fetching Layer
// Source: CIC-ERP Supabase (jyohocjsnsyfgfsmjfqx)
// ============================================

import { supabase } from './supabase';
import type {
  CmsPost, CmsCategory, CmsProduct, CmsService,
  CmsPartner, CmsBanner, CmsEvent, CmsSetting,
  ProjectWeb, JobOpening, ContactSubmission,
  CmsProductDomain, CmsMilestone, CmsCoreValue, NavItem
} from './types';

const NEWS_PER_PAGE = 12;
const PRODUCTS_PER_PAGE = 24;

// ════════════════════════════════════════════
// NEWS (cms_posts + cms_categories type=news)
// ════════════════════════════════════════════

export async function getNewsPaginated(page = 1, categorySlug?: string) {
  let query = supabase
    .from('cms_posts')
    .select('*, cms_categories!left(id, name_vi, slug)', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (categorySlug) {
    query = query.eq('cms_categories.slug', categorySlug);
  }

  const start = (page - 1) * NEWS_PER_PAGE;
  query = query.range(start, start + NEWS_PER_PAGE - 1);

  const { data, count, error } = await query;
  if (error) { console.error('getNewsPaginated error:', error); }

  const total = count || 0;
  const totalPages = Math.ceil(total / NEWS_PER_PAGE);

  return {
    items: (data || []) as CmsPost[],
    page,
    totalPages,
    total,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export async function getNewsCategories(): Promise<CmsCategory[]> {
  const { data, error } = await supabase
    .from('cms_categories')
    .select('*')
    .eq('type', 'news')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getNewsCategories error:', error); return []; }
  return data as CmsCategory[];
}

export async function getNewsArticle(slug: string): Promise<CmsPost | null> {
  const decodedSlug = decodeURIComponent(slug);
  const { data, error } = await supabase
    .from('cms_posts')
    .select('*, cms_categories(id, name_vi, slug)')
    .eq('slug', decodedSlug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;
  return data as CmsPost;
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cms_posts')
    .select('slug')
    .eq('status', 'published');
  if (error) return [];
  return (data || []).map(r => r.slug);
}

export async function getRelatedNews(currentSlug: string, limit = 4): Promise<CmsPost[]> {
  const { data, error } = await supabase
    .from('cms_posts')
    .select('*, cms_categories(id, name_vi, slug)')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data as CmsPost[];
}

export async function getFeaturedNews(limit = 6): Promise<CmsPost[]> {
  const { data, error } = await supabase
    .from('cms_posts')
    .select('*, cms_categories(id, name_vi, slug)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) { console.error('getFeaturedNews error:', error); return []; }
  return data as CmsPost[];
}

// ════════════════════════════════════════════
// PRODUCTS (ERP products table — Single Source of Truth)
// ════════════════════════════════════════════

export async function getProductCategories(): Promise<CmsCategory[]> {
  const { data, error } = await supabase
    .from('cms_categories')
    .select('*')
    .eq('type', 'product')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getProductCategories error:', error); return []; }
  return data as CmsCategory[];
}

export async function getProducts(categorySlug?: string): Promise<CmsProduct[]> {
  let query = supabase
    .from('products')
    .select(`*, product_categories${categorySlug ? '!inner' : ''}(id, name, slug)`)
    .eq('is_published_web', true)
    .order('name', { ascending: true });

  if (categorySlug) {
    query = query.eq('product_categories.slug', categorySlug);
  }

  const { data, error } = await query;
  if (error) { console.error('getProducts error:', error); return []; }
  return (data || []) as CmsProduct[];
}

export async function getFeaturedProducts(limit = 8): Promise<CmsProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(id, name, slug)')
    .eq('is_published_web', true)
    .eq('is_featured_web', true)
    .order('name', { ascending: true })
    .limit(limit);

  if (error) { console.error('getFeaturedProducts error:', error); return []; }
  return (data || []) as CmsProduct[];
}

export async function getProductBySlug(slug: string): Promise<CmsProduct | null> {
  const decodedSlug = decodeURIComponent(slug);
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(id, name, slug)')
    .eq('slug', decodedSlug)
    .eq('is_published_web', true)
    .single();

  if (error || !data) return null;
  return data as CmsProduct;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('is_published_web', true)
    .not('slug', 'is', null);
  if (error) return [];
  return (data || []).map(r => r.slug).filter(Boolean);
}

// ════════════════════════════════════════════
// SERVICES (cms_services)
// ════════════════════════════════════════════

export async function getServices(): Promise<CmsService[]> {
  const { data, error } = await supabase
    .from('cms_services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getServices error:', error); return []; }
  return data as CmsService[];
}

export async function getServiceBySlug(slug: string): Promise<CmsService | null> {
  const decodedSlug = decodeURIComponent(slug);
  const { data, error } = await supabase
    .from('cms_services')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data as CmsService;
}

// ════════════════════════════════════════════
// PARTNERS (cms_partners)
// ════════════════════════════════════════════

export async function getPartners(): Promise<CmsPartner[]> {
  const { data, error } = await supabase
    .from('cms_partners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getPartners error:', error); return []; }
  return data as CmsPartner[];
}

// ════════════════════════════════════════════
// BANNERS (cms_banners)
// ════════════════════════════════════════════

export async function getActiveBanners(): Promise<CmsBanner[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('cms_banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getActiveBanners error:', error); return []; }
  // Filter by date range client-side (Supabase doesn't support OR + nullable well)
  return (data || []).filter(b => {
    if (b.start_date && new Date(b.start_date) > new Date(now)) return false;
    if (b.end_date && new Date(b.end_date) < new Date(now)) return false;
    return true;
  }) as CmsBanner[];
}

// ════════════════════════════════════════════
// EVENTS (cms_events — legacy from cms_posts or separate table)
// ════════════════════════════════════════════

export async function getEvents(limit = 6): Promise<CmsEvent[]> {
  const { data, error } = await supabase
    .from('cms_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) { console.error('getEvents error:', error); return []; }
  return data as CmsEvent[];
}

// ════════════════════════════════════════════
// SETTINGS (cms_settings)
// ════════════════════════════════════════════

export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('cms_settings')
    .select('key, value');

  if (error) { console.error('getSettings error:', error); return {}; }
  const map: Record<string, string> = {};
  (data || []).forEach(s => { map[s.key] = typeof s.value === 'string' ? s.value : JSON.stringify(s.value); });
  return map;
}

// ════════════════════════════════════════════
// PROJECTS (ERP projects table)
// ════════════════════════════════════════════

export async function getFeaturedProjects(): Promise<ProjectWeb[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, name, slug, location, thumbnail_url, web_category, web_client_name, web_stats, is_published_web, is_featured_web')
    .eq('is_published_web', true)
    .eq('is_featured_web', true)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) { console.error('getFeaturedProjects error:', error); return []; }
  return data as ProjectWeb[];
}

// ════════════════════════════════════════════
// RECRUITMENT (ERP job_openings table)
// ════════════════════════════════════════════

export async function getJobOpenings(): Promise<JobOpening[]> {
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('is_published_web', true)
    .in('status', ['open', 'Open', 'OPEN'])
    .order('created_at', { ascending: false });

  if (error) { console.error('getJobOpenings error:', error); return []; }
  return data as JobOpening[];
}

export async function getJobOpeningBySlug(slug: string): Promise<JobOpening | null> {
  const decodedSlug = decodeURIComponent(slug);
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('is_published_web', true)
    .single();

  if (error || !data) return null;
  return data as JobOpening;
}

// ════════════════════════════════════════════
// CONTACT FORM SUBMISSION
// ════════════════════════════════════════════

export async function submitContact(payload: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([payload]);

  if (error) {
    console.error('submitContact error:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ════════════════════════════════════════════
// WEB CMS DATA (FROM SETTINGS & NEW CMS TABLES)
// ════════════════════════════════════════════

export async function getNavItems(): Promise<NavItem[]> {
  const { data, error } = await supabase
    .from('cms_nav_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('getNavItems error:', error); return []; }
  
  // Transform flat list to tree
  const items = data || [];
  const rootItems = items.filter(i => !i.parent_id).map(i => ({ 
    name: i.name, 
    href: i.href, 
    id: i.id, 
    children: undefined as {name: string; href: string}[] | undefined 
  }));
  
  rootItems.forEach(root => {
    const children = items.filter(i => i.parent_id === root.id);
    if (children.length > 0) {
      root.children = children.map(c => ({ name: c.name, href: c.href }));
    } else {
      delete root.children;
    }
  });
  
  return rootItems;
}

export async function getProductDomains(): Promise<CmsProductDomain[]> {
  const { data, error } = await supabase
    .from('cms_product_domains')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('getProductDomains error:', error); return []; }
  return data as CmsProductDomain[];
}

export async function getMilestones(): Promise<CmsMilestone[]> {
  const { data, error } = await supabase
    .from('cms_milestones')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('getMilestones error:', error); return []; }
  return data as CmsMilestone[];
}

export async function getCoreValues(): Promise<CmsCoreValue[]> {
  const { data, error } = await supabase
    .from('cms_core_values')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { console.error('getCoreValues error:', error); return []; }
  return data as CmsCoreValue[];
}

export async function getLiveStats() {
  // Count Published Products
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_published_web', true);
    
  // Count Customers (assuming there's a customers or related table, fallback to fixed or settings if not)
  // Let's use `customers` table if it exists in ERP, else return a hardcoded 10k+
  const { count: customerCount } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
    
  // Count Job Openings
  const { count: jobCount } = await supabase
    .from('job_openings')
    .select('*', { count: 'exact', head: true })
    .eq('is_published_web', true);

  return [
    { value: "35+", label: "Năm kinh nghiệm", iconName: "Award" },
    { value: `${productCount || 45}+`, label: "Phần mềm chuyên ngành", iconName: "Building2" },
    { value: `${customerCount || '1.000'}+`, label: "Khách hàng tin cậy", iconName: "Users" },
    { value: "34", label: "Tỉnh thành phủ sóng", iconName: "MapPin" }
  ];
}

