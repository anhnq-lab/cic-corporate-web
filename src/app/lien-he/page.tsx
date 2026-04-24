import { ContactForm } from "./contact-form";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Liên hệ | CIC Software",
  description: "Liên hệ với CIC để được tư vấn giải pháp phần mềm phù hợp cho doanh nghiệp của bạn.",
};

interface PageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const productSlug = sp.product || undefined;
  const settings = await getSettings();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ CIC Software",
    "description": "Liên hệ với CIC để được tư vấn giải pháp phần mềm chuyên ngành công trình xây dựng.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Công ty CP Công nghệ và Tư vấn CIC",
      "telephone": settings?.company_phone_hn || "+84-86-893-4576",
      "email": settings?.company_email || "info@cic.com.vn"
    }
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {/* Hero Header */}
      <section className="w-full pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] -z-10" />
        <div className="container max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            Hỗ trợ 24/7
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
            Hãy <span className="gradient-text">kết nối</span> với chúng tôi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Đội ngũ tư vấn CIC luôn sẵn sàng hỗ trợ bạn tìm giải pháp phần mềm phù hợp nhất.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full px-4 pb-16">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-card rounded-2xl p-7 md:p-9 border border-border/50">
              <h2 className="text-2xl font-bold font-heading mb-6">Gửi yêu cầu tư vấn</h2>
              <ContactForm productSlug={productSlug} />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Hà Nội */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold font-heading text-lg mb-4">Trụ sở Hà Nội</h3>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span className="text-muted-foreground">{settings?.company_address_hn}</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{settings?.company_phone_hn}</span>
                  </li>
                </ul>
              </div>

              {/* HCM */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold font-heading text-lg mb-4">Chi nhánh TP. HCM</h3>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span className="text-muted-foreground">{settings?.company_address_hcm}</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{settings?.company_phone_hcm}</span>
                  </li>
                </ul>
              </div>

              {/* General */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold font-heading text-lg mb-4">Thông tin chung</h3>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{settings?.company_email}</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 17:30</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

