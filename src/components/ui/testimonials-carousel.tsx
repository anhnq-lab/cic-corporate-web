"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    role: "Giám đốc Kỹ thuật",
    company: "Công ty Xây dựng Trung Chính",
    quote: "Phần mềm CIC đã giúp chúng tôi giảm 40% thời gian lập dự toán và tăng độ chính xác lên 95%. Đội ngũ hỗ trợ rất chuyên nghiệp.",
    rating: 5,
  },
  {
    id: "2",
    name: "Trần Thị Mai",
    role: "Quản lý Dự án",
    company: "Tổng công ty Tư vấn Xây dựng",
    quote: "Hệ sinh thái BIM của CIC là giải pháp toàn diện nhất mà chúng tôi từng sử dụng. Từ thiết kế đến quản lý thi công đều được tích hợp liền mạch.",
    rating: 5,
  },
  {
    id: "3",
    name: "Lê Hoàng Minh",
    role: "Kỹ sư Kết cấu",
    company: "Công ty CP Tư vấn Xây dựng số 1",
    quote: "Tính năng tự động hóa trong CIC giúp tôi tiết kiệm hàng giờ tính toán thủ công. Kết quả xuất ra luôn chính xác và đúng tiêu chuẩn.",
    rating: 5,
  },
  {
    id: "4",
    name: "Phạm Đức Thanh",
    role: "Giám đốc",
    company: "Công ty TNHH Xây dựng và Thương mại",
    quote: "Chúng tôi đã chuyển đổi toàn bộ quy trình sang hệ thống CIC. Năng suất tăng gấp đôi, sai sót giảm đáng kể, khách hàng rất hài lòng.",
    rating: 5,
  },
  {
    id: "5",
    name: "Hoàng Thị Lan",
    role: "Trưởng phòng Kế hoạch",
    company: "Ban Quản lý Dự án Giao thông",
    quote: "CIC không chỉ là phần mềm, mà là một giải pháp chuyển đổi số thực sự. Chúng tôi quản lý được hàng trăm dự án cùng lúc.",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoplay, next]);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Khách hàng nói gì về CIC?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hơn 10,000 doanh nghiệp đã tin tưởng sử dụng phần mềm CIC
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-card border border-border/60 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <Quote className="w-10 h-10 text-accent/30 mb-4" />

              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                "{TESTIMONIALS[current].quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  {TESTIMONIALS[current].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{TESTIMONIALS[current].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {TESTIMONIALS[current].role} — {TESTIMONIALS[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border/60 hover:bg-muted/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2 bg-accent"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-border/60 hover:bg-muted/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
