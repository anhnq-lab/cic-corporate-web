"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import { ArrowRight } from "lucide-react"

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08
    }
  }
}

export function HeroSection({ stats = [] }: { stats?: any[] }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.96]);

  return (
    <section className="w-full pt-16 pb-10 md:pt-20 md:pb-16 flex flex-col items-center text-center relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10 bg-[#0A0D14]">
        {/* Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-screen" 
          style={{ backgroundImage: 'url(/images/hero_bg.png)' }}
        />
        
        {/* Gradient Overlay to ensure text readability and fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

        {/* Soft orange glow — top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Soft navy glow — bottom left */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container max-w-5xl mx-auto space-y-6 z-10 px-4 pt-0 md:pt-4 pb-8"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div 
          variants={staggerVariants}
          className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-5 py-2 rounded-full text-sm font-semibold"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
          Hơn 30 năm kinh nghiệm
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1 
          variants={staggerVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground leading-[1.1]"
        >
          Giải pháp chuyển đổi số
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-orange-400 to-amber-500">Kỷ nguyên xây dựng 4.0</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          variants={staggerVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Hệ sinh thái 45+ phần mềm chuyên ngành xây dựng, giao thông, thuỷ lợi 
          — đồng hành cùng hơn 1.000 doanh nghiệp chuyển đổi số.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={staggerVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Link href="/san-pham">
            <Button size="lg" className="group relative overflow-hidden h-12 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full glow-accent w-full sm:w-auto transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center">
                Khám phá sản phẩm
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
            </Button>
          </Link>
          <Link href="/gioi-thieu">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-border/60 hover:bg-muted/50 w-full sm:w-auto font-medium hover:scale-105 transition-transform">
              Tìm hiểu thêm
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-4xl mx-auto px-4 pb-12 z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const IconName = stat.iconName;
            // @ts-ignore
            const Icon = Icons[IconName] || Icons.Circle;
            return (
              <div 
                key={i} 
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-accent/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-accent mb-1" />
                <span className="text-2xl md:text-3xl font-bold font-heading text-foreground">{stat.value}</span>
                <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  )
}
