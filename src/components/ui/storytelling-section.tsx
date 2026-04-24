"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Award, Globe } from "lucide-react";

// Animated stat for storytelling
function StoryStat({
  value,
  label,
  icon,
  delay = 0,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 text-accent mb-4">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

// Parallax section wrapper
function ParallaxSection({
  children,
  offset = 100,
}: {
  children: React.ReactNode;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

// Timeline milestone
function TimelineMilestone({
  year,
  title,
  description,
  index,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex items-start gap-6 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-5xl font-bold font-heading text-accent/30">
          {year}
        </span>
        <h3 className="text-xl font-bold text-foreground mt-2">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      {/* Dot */}
      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-accent border-4 border-background mt-4" />

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

const MILESTONES = [
  {
    year: "1995",
    title: "Thành lập CIC",
    description: "Bắt đầu với đội ngũ 5 kỹ sư tâm huyết với công nghệ xây dựng",
  },
  {
    year: "2005",
    title: "Ra mắt phần mềm Dự Toán CIC",
    description: "Sản phẩm chủ lực được 1000+ doanh nghiệp tin dùng",
  },
  {
    year: "2012",
    title: "Mở rộng hệ sinh thái",
    description: "Phát triển 20+ sản phẩm cho mọi giai đoạn dự án",
  },
  {
    year: "2018",
    title: "Tiên phong BIM tại Việt Nam",
    description: "Giải pháp BIM Management đầu tiên cho thị trường Việt",
  },
  {
    year: "2023",
    title: "Chuyển đổi số toàn diện",
    description: "Nền tảng CDE tích hợp AI, phục vụ 10,000+ doanh nghiệp",
  },
  {
    year: "2026",
    title: "Kỷ nguyên AI",
    description: "Tích hợp AI vào mọi quy trình, đồng hành cùng Smart City",
  },
];

export function StorytellingSection() {
  return (
    <section className="w-full relative">
      {/* Hero Stats */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6"
            >
              Hơn 30 năm
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-orange-400">
                đồng hành cùng doanh nghiệp
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Từ một startup nhỏ, CIC đã phát triển thành hệ sinh thái phần mềm
              xây dựng hàng đầu Việt Nam
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StoryStat
              value="30+"
              label="Năm kinh nghiệm"
              icon={<Award className="w-6 h-6" />}
              delay={0}
            />
            <StoryStat
              value="45+"
              label="Sản phẩm"
              icon={<Globe className="w-6 h-6" />}
              delay={0.1}
            />
            <StoryStat
              value="10K+"
              label="Doanh nghiệp"
              icon={<Users className="w-6 h-6" />}
              delay={0.2}
            />
            <StoryStat
              value="1M+"
              label="Dự án xử lý"
              icon={<TrendingUp className="w-6 h-6" />}
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 md:py-32 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-foreground text-center mb-16"
          >
            Hành trình phát triển
          </motion.h2>

          {/* Vertical line */}
          <div className="absolute left-1/2 top-1/2 bottom-0 w-px bg-border/40 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((milestone, index) => (
              <TimelineMilestone key={milestone.year} {...milestone} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0F1D32] to-[#162A46] rounded-3xl p-10 md:p-16 text-center overflow-hidden relative"
          >
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                Trở thành một phần câu chuyện
              </h3>
              <p className="text-lg text-slate-300/80 mb-8 max-w-xl mx-auto">
                Tham gia cùng 10,000+ doanh nghiệp đã tin tưởng CIC
              </p>
              <a
                href="/lien-he"
                className="inline-flex items-center gap-2 h-12 px-8 text-base bg-accent text-white hover:bg-accent/90 rounded-full font-semibold glow-accent transition-all hover:scale-105"
              >
                Bắt đầu ngay
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
