import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight, CheckCircle2, Target, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";
import { getLiveStats, getMilestones, getCoreValues } from "@/lib/data";
import { StorytellingSection } from "@/components/ui/storytelling-section";
import { ShareButtons } from "@/components/ui/share-buttons";

export const metadata: Metadata = {
  title: "Giới thiệu | CIC Software",
  description: "Tìm hiểu về Công ty CP Công nghệ và Tư vấn CIC — hơn 30 năm kinh nghiệm phát triển phần mềm chuyên ngành xây dựng tại Việt Nam.",
};

const STATIC_VALUE_ICONS = [Target, Eye, Heart];

export default async function AboutPage() {
  const [stats, milestones, coreValues] = await Promise.all([
    getLiveStats(),
    getMilestones(),
    getCoreValues()
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Giới thiệu Công ty CP Công nghệ và Tư vấn CIC",
    "description": "CIC định hướng phát triển trở thành doanh nghiệp hàng đầu trong lĩnh vực cung cấp các giải pháp phần mềm dự toán, phần mềm thiết kế và BIM cho ngành xây dựng tại Việt Nam.",
    "publisher": {
      "@type": "Organization",
      "name": "Công ty CP Công nghệ và Tư vấn CIC"
    }
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {/* Hero */}
      <section className="w-full pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] -z-10" />
        <div className="container max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            Về chúng tôi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
            Hơn 30 năm <span className="gradient-text">đồng hành</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            CIC tự hào là đơn vị tiên phong trong phát triển phần mềm dự toán, thiết kế kết cấu, giải pháp BIM và chuyển đổi số ngành xây dựng, giao thông tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-4 pb-16">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const IconName = stat.iconName;
              // @ts-ignore
              const Icon = Icons[IconName] || Icons.Circle;
              return (
                <div key={i} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-card border border-border/40 text-center">
                  <Icon className="w-5 h-5 text-accent mb-1" />
                  <span className="text-3xl font-bold font-heading text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 px-4 bg-muted/20" id="nang-luc">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Giá trị dẫn lối</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreValues.map((value, idx) => {
              const Icon = STATIC_VALUE_ICONS[idx % STATIC_VALUE_ICONS.length];
              return (
                <div key={idx} className="bg-card rounded-2xl p-7 border border-border/50 hover:border-accent/40 hover-lift transition-all duration-300 text-center">
                  <div className="mx-auto w-fit p-3 rounded-xl bg-accent/10 mb-5">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="w-full py-16 px-4" id="thanh-tuu">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Hành trình phát triển</h2>
          <div className="space-y-0">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-5 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent/30 shrink-0 mt-1.5" />
                  {idx < milestones.length - 1 && <div className="w-px h-full min-h-[48px] bg-border" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-accent">{milestone.year}</span>
                  <p className="text-foreground font-medium mt-0.5">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-10 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center bg-gradient-to-br from-[#0F1D32] to-[#162A46] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[250px] h-[250px] bg-accent/15 rounded-full blur-[100px]" />
            <div className="relative z-10 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">Trở thành đối tác của CIC</h2>
              <p className="text-slate-300/80 text-lg max-w-2xl mx-auto">
                Hãy cùng chúng tôi kiến tạo tương lai số hoá cho ngành xây dựng Việt Nam.
              </p>
              <Link href="/lien-he">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 rounded-full font-semibold px-8 glow-accent mt-2">
                  Liên hệ ngay
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
