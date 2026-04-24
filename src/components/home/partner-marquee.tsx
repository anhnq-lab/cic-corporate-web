"use client"

import Image from "next/image";
import type { CmsPartner } from "@/lib/types";
import { normalizeImageUrl } from "@/lib/utils";

interface PartnerMarqueeProps {
  partners: CmsPartner[];
}

export function PartnerMarquee({ partners }: PartnerMarqueeProps) {
  if (partners.length === 0) return null;

  // Fallback to extracted logos from cic.com.vn if missing from DB or for UI demonstration
  const displayPartners = partners.every(p => !p.logo_url) ? [
    { id: '1', name: 'Trimble', logo_url: 'https://www.cic.com.vn/images/banners/original/trimble_1584082277.jpg', website_url: '#' },
    { id: '2', name: 'Hòa Bình', logo_url: 'https://www.cic.com.vn/images/banners/original/hoa-binh_1584075002.jpg', website_url: '#' },
    { id: '3', name: 'Ecoba', logo_url: 'https://www.cic.com.vn/images/banners/original/ecoba_1584074294.jpg', website_url: '#' },
    { id: '4', name: 'Idea Statica', logo_url: 'https://www.cic.com.vn/images/banners/original/idea-statica_1584075029.jpg', website_url: '#' },
    { id: '5', name: 'TEDI South', logo_url: 'https://www.cic.com.vn/images/banners/original/tedi-south_1584082165.jpg', website_url: '#' },
    { id: '6', name: 'DCCD', logo_url: 'https://www.cic.com.vn/images/banners/original/dccd_1584074152.jpg', website_url: '#' },
    { id: '7', name: 'Geotomo', logo_url: 'https://www.cic.com.vn/images/banners/original/geotomo_1584074933.jpg', website_url: '#' },
    { id: '8', name: 'Geoscanners', logo_url: 'https://www.cic.com.vn/images/banners/original/geoscanners-_1584074884.jpg', website_url: '#' }
  ] : partners;

  // Double the items for seamless infinite scroll
  const items = [...displayPartners, ...displayPartners];

  return (
    <section className="w-full py-8 overflow-hidden border-y border-border/30 bg-muted/20">
      <div className="container max-w-screen-xl mx-auto px-4 mb-6">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Đối tác công nghệ hàng đầu
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 gap-8 items-center animate-marquee" style={{ '--duration': '40s' } as React.CSSProperties}>
          {items.map((partner, i) => (
            <a
              key={`${partner.id}-${i}`}
              href={partner.website_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 shrink-0 rounded-2xl bg-white dark:bg-slate-100 border border-border/50 hover:border-accent shadow-sm hover:shadow-md transition-all group min-w-[180px] h-[90px]"
              title={partner.name}
            >
              {partner.logo_url && normalizeImageUrl(partner.logo_url) ? (
                <Image
                  src={normalizeImageUrl(partner.logo_url)!}
                  alt={partner.name}
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain transition-all group-hover:scale-105"
                  unoptimized
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
