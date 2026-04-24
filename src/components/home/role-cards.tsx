"use client"

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { CmsService } from "@/lib/types";
import { normalizeImageUrl } from "@/lib/utils";
import Image from "next/image";

export function RoleCardsSection({ services }: { services: CmsService[] }) {
  return (
    <section className="w-full py-12 md:py-16 bg-muted/20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      <div className="container max-w-6xl mx-auto px-4 z-10 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">Dịch vụ cốt lõi</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
            Năng lực tư vấn chuyên sâu
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Sở hữu kinh nghiệm hơn 30 năm, chúng tôi là đối tác kỹ thuật số hàng đầu cho các công trình trọng điểm quốc gia.
          </p>
        </motion.div>

        {/* Service Cards */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.slice(0, 8).map((service, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                key={service.id} 
                className="group bg-card border border-border/50 rounded-2xl p-7 hover:border-accent/40 hover:shadow-lg hover-lift transition-all duration-300 flex flex-col"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon_url && normalizeImageUrl(service.icon_url) ? (
                      <div className="relative w-8 h-8">
                        <Image fill unoptimized src={normalizeImageUrl(service.icon_url)!} alt="" className="object-contain" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold font-heading group-hover:text-accent transition-colors duration-300">
                      {service.name_vi}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-[15px] leading-relaxed min-h-[72px]">
                    {service.description_vi || 'Dịch vụ tư vấn chuyên nghiệp từ CIC.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Đang cập nhật danh sách dịch vụ.
          </div>
        )}
      </div>
    </section>
  )
}
