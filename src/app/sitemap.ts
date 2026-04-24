import type { MetadataRoute } from 'next';
import { getAllNewsSlugs, getAllProductSlugs } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cic.com.vn';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/san-pham`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/dich-vu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/tuyen-dung`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.7 },
  ];

  const productSlugs = await getAllProductSlugs();
  const productRoutes = productSlugs.map((slug) => ({
    url: `${baseUrl}/san-pham/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const newsSlugs = await getAllNewsSlugs();
  const newsRoutes = newsSlugs.map((slug) => ({
    url: `${baseUrl}/tin-tuc/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
