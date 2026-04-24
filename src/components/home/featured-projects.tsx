"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, Maximize, Layers, Briefcase } from "lucide-react"
import type { ProjectWeb } from "@/lib/types"
import { normalizeImageUrl } from "@/lib/utils"

function getStatValue(statsRaw: string | null, labelQuery: string) {
  if (!statsRaw) return null;
  try {
    const list = JSON.parse(statsRaw);
    if (Array.isArray(list)) {
      const match = list.find(l => typeof l.label === 'string' && l.label.toLowerCase().includes(labelQuery.toLowerCase()));
      return match ? match.value : null;
    }
  } catch (e) {
    // Ignore error
  }
  return null;
}

export function FeaturedProjects({ projects }: { projects: ProjectWeb[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const isHovered = React.useRef(false)
  const isDragging = React.useRef(false)
  
  // Create a continuous array for seamless scroll
  const scrollItems = [...projects, ...projects, ...projects]

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el || projects.length === 0) return

    let animationId: number;

    const scrollStep = () => {
      if (!isHovered.current && !isDragging.current && el) {
        el.scrollLeft += 0.8; // Speed of auto-scroll
        
        // Seamless loop resetting
        // Because we duplicated it 3 times, if we reach 2/3 of the scroll width, we snap back to 1/3
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft = singleSetWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft = singleSetWidth;
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    }
    
    // Initial start position jump
    el.scrollLeft = el.scrollWidth / 3;

    // Mouse pause
    const onEnter = () => { isHovered.current = true; }
    const onLeave = () => { isHovered.current = false; }
    
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchstart', onEnter)
    el.addEventListener('touchend', onLeave)

    animationId = requestAnimationFrame(scrollStep)
    
    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchstart', onEnter)
      el.removeEventListener('touchend', onLeave)
    }
  }, [projects.length])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  if (projects.length === 0) return null;

  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-10 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-accent uppercase tracking-wider"
          >
            Dự án tiêu biểu
          </motion.p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-border/60 hover:border-accent/40 hover:bg-muted/50 transition-all"
              aria-label="Trượt trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
               onClick={() => scroll("right")}
              className="p-2.5 rounded-full border border-border/60 hover:border-accent/40 hover:bg-muted/50 transition-all"
              aria-label="Trượt phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel — full width */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {scrollItems.map((project, idx) => {
            const quyMo = getStatValue(project.web_stats, 'Quy mô') || getStatValue(project.web_stats, 'Diện tích');
            const phamVi = getStatValue(project.web_stats, 'Phạm vi') || getStatValue(project.web_stats, 'Nội dung');
            
            return (
              <motion.div
                key={`${project.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % projects.length) * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl flex-none"
                style={{ width: "calc(25% - 12px)", minWidth: "280px" }}
              >
                  {/* Image container with fixed aspect ratio */}
                  <div className="relative w-full overflow-hidden" style={{ paddingBottom: "140%" }}>
                    {/* Glare Shine Mask */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out pointer-events-none" />
                    
                    {project.thumbnail_url && normalizeImageUrl(project.thumbnail_url) ? (
                      <img
                        src={normalizeImageUrl(project.thumbnail_url)!}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 transition-transform duration-[1.5s] group-hover:scale-110" />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <div className="flex items-center gap-2 mb-3">
                          {project.web_category && (
                            <span className="px-2.5 py-0.5 bg-accent text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-[0_0_10px_rgba(232,101,45,0.4)]">
                              {project.web_category}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-[17px] font-heading font-semibold text-white leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
                          {project.name}
                        </h3>
                        
                        {project.web_client_name && (
                          <p className="text-white/60 text-xs font-medium flex items-center gap-1.5 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                            {project.web_client_name}
                          </p>
                        )}

                        {/* Extended Details (Visible on hover) */}
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                           {project.location && (
                             <div className="flex items-start gap-2 text-white/70 text-xs">
                               <MapPin size={13} className="shrink-0 mt-0.5 text-accent/80" />
                               <span className="line-clamp-2">{project.location}</span>
                             </div>
                           )}
                           {quyMo && (
                             <div className="flex items-start gap-2 text-white/70 text-xs">
                               <Maximize size={13} className="shrink-0 mt-0.5 text-accent/80" />
                               <span className="line-clamp-1">{quyMo}</span>
                             </div>
                           )}
                           {phamVi && (
                             <div className="flex items-start gap-2 text-white/70 text-xs">
                               <Layers size={13} className="shrink-0 mt-0.5 text-accent/80" />
                               <span className="line-clamp-2">{phamVi}</span>
                             </div>
                           )}
                           {!phamVi && !quyMo && !project.location && (
                             <div className="flex items-start gap-2 text-white/70 text-xs">
                               <Briefcase size={13} className="shrink-0 mt-0.5 text-accent/80" />
                               Dự án tiêu biểu CIC 
                             </div>
                           )}
                        </div>

                      </div>
                    </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
