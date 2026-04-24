import { getServices } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { Briefcase } from "lucide-react";

// ISR: Revalidate services every 1 hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dịch vụ tư vấn | CIC Software",
  description: "Dịch vụ tư vấn BIM, xây dựng, dự án và phát triển bền vững từ đội ngũ chuyên gia CIC.",
};

export default async function ServicesPage() {
  const services = await getServices();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name_vi,
        "provider": {
          "@type": "Organization",
          "name": "Công ty CP Công nghệ và Tư vấn CIC"
        },
        "description": service.description_vi
      }
    }))
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Header */}
      <section className="w-full pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] -z-10" />
        <div className="container max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            Năng lực cốt lõi
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Dịch vụ tư vấn <span className="gradient-text">chuyên nghiệp</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Đội ngũ chuyên gia giàu kinh nghiệm, CIC cung cấp dịch vụ tư vấn kỹ thuật cao từ chuyển giao công nghệ đến giám sát dự án.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="w-full py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <div
                  key={service.id}
                  id={service.slug}
                  className="bg-card rounded-2xl p-7 border border-border/50 hover:border-accent/40 hover:shadow-lg hover-lift transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon_url ? (
                      <img src={service.icon_url} alt="" className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-accent" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold font-heading group-hover:text-accent transition-colors">
                      {service.name_vi}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 flex-1">
                    {service.description_vi || 'Dịch vụ tư vấn chuyên nghiệp từ CIC.'}
                  </p>

                  <div className="mt-auto pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <Link href={`/dich-vu/${service.slug}`} className="flex-1 w-full">
                      <Button className="w-full rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white border-0 transition-colors">
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Link href={`/lien-he?service=${service.slug}`} className="flex-1 w-full">
                      <Button className="w-full rounded-full" variant="outline">
                        Liên hệ
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-border/30">
              <p className="text-muted-foreground">Đang cập nhật danh sách dịch vụ.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center bg-gradient-to-br from-[#0F1D32] to-[#162A46] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] bg-accent/15 rounded-full blur-[100px]" />
            <div className="relative z-10 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">Cần đội ngũ chuyên gia?</h2>
              <p className="text-slate-300/80 text-lg max-w-2xl mx-auto">
                Hợp tác cùng CIC để đảm bảo tính pháp lý, tiết kiệm kinh phí và rút ngắn thời gian triển khai dự án.
              </p>
              <Link href="/lien-he">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 rounded-full font-semibold px-8 glow-accent mt-2">
                  Ký hợp đồng dịch vụ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
