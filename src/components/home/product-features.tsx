"use client"

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export function ProductFeaturesSection({ domains = [] }: { domains?: any[] }) {
  return (
    <section className="w-full py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] -z-10" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">Hệ sinh thái</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading leading-tight text-foreground">
            Phần mềm đa ngành
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Hơn 45 phần mềm chuyên ngành phát triển và tối ưu cho điều kiện Việt Nam, phục vụ đa dạng các lĩnh vực kinh tế mũi nhọn.
          </p>
        </motion.div>

        {/* Product Grid - 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {domains.map((domain, index) => {
            const IconName = domain.icon_name;
            // @ts-ignore
            const Icon = Icons[IconName] || Icons.Circle;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true, margin: "-40px" }}
                key={index}
                className="group relative bg-card border border-border/60 hover:border-accent/40 rounded-3xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                <Link href="/san-pham" className="absolute inset-0 z-20">
                  <span className="sr-only">Xem chi tiết {domain.title}</span>
                </Link>
                
                {/* Crosshairs (Architectural Premium touch) */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Glare/Shine Effect mask */}
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full duration-1000 transition-all pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon + Title + Arrow */}
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex p-2.5 rounded-xl bg-secondary/80 dark:bg-slate-800/80 group-hover:bg-accent/10 transition-colors duration-300 shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold font-heading text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                        {domain.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-accent -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 shrink-0" />
                  </div>
                  
                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed flex-1 text-sm mb-4 line-clamp-2">
                    {domain.description}
                  </p>

                  {/* Software Logos / Pills Mockup */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                    {(() => {
                      // Mock data based on domain title for preview
                      const appsMap: Record<string, string[]> = {
                        "Xây dựng dân dụng & Công nghiệp": ["enjiCAD", "KetcauSoft", "Revit", "Tekla"],
                        "Giao thông & Cầu đường": ["Civil 3D", "Nova TDN", "Plaxis"],
                        "Thuỷ lợi & Thuỷ điện": ["AutoCAD", "HEC-RAS", "GeoStudio"],
                        "Khai khoáng & Dầu khí": ["Surpac", "Petrel"],
                        "Môi trường & ESG": ["SimaPro", "OpenLCA"],
                        "Cơ khí chế tạo": ["SolidWorks", "Inventor"]
                      };
                      const apps = appsMap[domain.title] || ["Phần mềm 1", "Phần mềm 2"];
                      return apps.map((app, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mr-1.5"></span>
                          {app}
                        </span>
                      ));
                    })()}
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium text-muted-foreground/70 hover:text-accent cursor-pointer transition-colors">
                      + Xem thêm
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
