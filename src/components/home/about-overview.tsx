"use client";

import { Award, TrendingUp, Users, Globe, Layers, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const successFactors = [
  {
    icon: Award,
    title: "THƯƠNG HIỆU TIN CẬY",
  },
  {
    icon: TrendingUp,
    title: "HƠN 30 NĂM PHÁT TRIỂN",
  },
  {
    icon: Users,
    title: "ĐỘI NGŨ CHUYÊN NGHIỆP",
  },
  {
    icon: Globe,
    title: "THỊ TRƯỜNG RỘNG LỚN",
  },
  {
    icon: Layers,
    title: "SẢN PHẨM ĐA DẠNG",
  },
];

export function AboutOverviewSection() {
  return (
    <section className="w-full py-12 md:py-16 border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container max-w-screen-xl mx-auto px-4 lg:px-8">
        
        {/* Top Part: Success Factors */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4 text-center uppercase">
            Chúng tôi có thể giúp bạn thành công
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 w-full px-4 lg:px-0">
            {successFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800 mb-4 group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <Icon className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm text-slate-800 dark:text-white transition-colors uppercase leading-relaxed max-w-[140px]">
                    {factor.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Part: Overview */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 bg-orange-500 rounded-sm"></div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground uppercase tracking-tight">
                Tổng quan về CIC
              </h2>
            </div>
            
            <div className="prose prose-slate dark:prose-invert text-muted-foreground leading-relaxed text-base text-justify">
              <p>
                <strong className="text-foreground">Công ty Cổ phần Công nghệ và Tư vấn CIC</strong>, tiền thân là Trung tâm Tin học thuộc <strong className="text-foreground">Bộ Xây Dựng</strong> chính thức thành lập vào ngày 27/11/1990, bắt đầu hoạt động với chức năng là cơ quan tham mưu tin học thuộc Bộ Xây dựng nhằm phục vụ yêu cầu ứng dụng và phát triển Công nghệ thông tin trong ngành.
              </p>
              <p className="mt-4">
                Ra đời trong thời kỳ đất nước đang chuyển mình và hội nhập với quá trình bùng nổ công nghệ thông tin trên toàn thế giới, bên cạnh yếu tố thuận lợi khách quan CIC đã không ngừng nỗ lực vượt khó, vươn lên và khẳng định vị thế của mình trong lĩnh vực khoa học công nghệ...
              </p>
            </div>

            <Link href="/gioi-thieu" className="inline-block pt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 transition-colors glow-accent">
                XEM THÊM <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="lg:col-span-3 relative">
            <div className="relative aspect-[3/2] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              {/* Fallback pattern gradient if image is not right yet, using Unsplash tech/collab image as placeholder */}
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="CIC Team Collaboration" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/30 to-transparent mix-blend-overlay"></div>
            </div>
            
            {/* Decorative elements behind image */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-[2rem] border-2 border-orange-500/20 max-w-[80%] max-h-[80%]"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
