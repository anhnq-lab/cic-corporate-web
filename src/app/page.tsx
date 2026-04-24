import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/hero-section";
import { RoleCardsSection } from "@/components/home/role-cards";
import { ProductFeaturesSection } from "@/components/home/product-features";
import { AboutOverviewSection } from "@/components/home/about-overview";
import { PartnerMarquee } from "@/components/home/partner-marquee";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { LatestNews } from "@/components/home/latest-news";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects, getPartners, getFeaturedNews, getServices, getLiveStats, getProductDomains } from "@/lib/data";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { NewsletterSection } from "@/components/ui/newsletter-section";
import { FAQSection } from "@/components/ui/faq-section";
import { ProductEcosystemMap } from "@/components/ui/product-ecosystem-map";

// ISR: Revalidate homepage every 1 hour
export const revalidate = 3600;

export default async function Home() {
  const [projects, partners, news, services, stats, productDomains] = await Promise.all([
    getFeaturedProjects(),
    getPartners(),
    getFeaturedNews(3),
    getServices(),
    getLiveStats(),
    getProductDomains(),
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection stats={stats} />

      <PartnerMarquee partners={partners} />

      <AboutOverviewSection />

      <ProductFeaturesSection domains={productDomains} />

      <RoleCardsSection services={services} />

      <FeaturedProjects projects={projects} />

      <ProductEcosystemMap />

      <TestimonialsCarousel />

      <LatestNews posts={news} />

      <NewsletterSection />

      <FAQSection />

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-[#0F1D32] to-[#162A46] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[80px]" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white">
                Chuẩn bị cho kỷ nguyên số hoá?
              </h2>
              <p className="text-lg text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
                Hàng ngàn kỹ sư và doanh nghiệp hàng đầu đã tin tưởng chọn phần mềm CIC.
                Bắt đầu tối ưu hoá dự án ngay hôm nay.
              </p>
              <Link href="/lien-he">
                <Button size="lg" className="h-12 px-8 text-base bg-accent text-white hover:bg-accent/90 rounded-full font-semibold glow-accent mt-2">
                  Đăng ký trải nghiệm miễn phí
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
