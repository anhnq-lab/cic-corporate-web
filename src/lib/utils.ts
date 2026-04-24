import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize an image URL for use with next/image.
 * - Absolute URLs (http/https) → keep as-is
 * - Already starts with "/" → keep as-is  
 * - Relative paths (e.g. "images/news/...") → prepend "/"
 * - Null/empty → return null
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  let trimmed = url.trim();
  if (!trimmed) return null;

  // Strip legacy domains to serve from local public folder
  const legacyDomains = [
    'https://cic.com.vn',
    'http://cic.com.vn',
    'https://www.cic.com.vn',
    'http://www.cic.com.vn',
    'https://dutoancic.vn',
    'http://dutoancic.vn',
  ];

  for (const domain of legacyDomains) {
    if (trimmed.startsWith(domain)) {
      trimmed = trimmed.substring(domain.length);
      break;
    }
  }

  // Handle double slashes
  if (trimmed.startsWith('//cic.com.vn') || trimmed.startsWith('//www.cic.com.vn')) {
    trimmed = trimmed.replace(/\/\/(?:www\.)?cic\.com\.vn/, '');
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return `/${trimmed}`;
}
