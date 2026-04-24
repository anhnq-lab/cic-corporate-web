"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: "1",
    question: "CIC cung cấp những phần mềm gì?",
    answer: "CIC cung cấp hệ sinh thái 45+ phần mềm chuyên ngành xây dựng, bao gồm: Phần mềm lập dự toán, Quản lý dự án (CDE), BIM Management, Tiến độ thi công, Quản lý chất lượng, Quản lý hồ sơ, và nhiều giải pháp khác cho xây dựng, giao thông, thuỷ lợi.",
    category: "Sản phẩm",
  },
  {
    id: "2",
    question: "Làm sao để dùng thử phần mềm CIC?",
    answer: "Bạn có thể đăng ký dùng thử miễn phí tại trang Liên hệ hoặc gọi hotline 086.893.4576. Đội ngũ tư vấn sẽ liên hệ để cài đặt và hướng dẫn sử dụng trong vòng 24h.",
    category: "Dùng thử",
  },
  {
    id: "3",
    question: "Phần mềm CIC có hỗ trợ đào tạo không?",
    answer: "Có. CIC cung cấp chương trình đào tạo toàn diện bao gồm: Tài liệu hướng dẫn, Video tutorial, Webinar hàng tháng, Đào tạo trực tiếp tại công ty (với gói Enterprise), và Cộng đồng người dùng CIC trên toàn quốc.",
    category: "Đào tạo",
  },
  {
    id: "4",
    question: "Chi phí sử dụng phần mềm như thế nào?",
    answer: "CIC có nhiều gói giá phù hợp: Gói Starter miễn phí cho cá nhân, gói Professional cho doanh nghiệp vừa (từ 2.5M/tháng), và gói Enterprise cho doanh nghiệp lớn (liên hệ báo giá). Thanh toán linh hoạt theo tháng/năm với ưu đãi 15% khi thanh toán năm.",
    category: "Giá cả",
  },
  {
    id: "5",
    question: "Phần mềm có cập nhật thường xuyên không?",
    answer: "CIC cập nhật phần mềm liên tục hàng tháng với các tính năng mới, cải tiến hiệu năng và vá lỗi. Tất cả cập nhật đều miễn phí cho người dùng đang sử dụng gói trả phí.",
    category: "Cập nhật",
  },
  {
    id: "6",
    question: "CIC có hỗ trợ kỹ thuật không?",
    answer: "CIC có đội ngũ hỗ trợ kỹ thuật chuyên nghiệp: Hỗ trợ qua email (tất cả gói), Hotline ưu tiên (Professional), và Hỗ trợ riêng 1-1 với tài khoản kỹ thuật dedicated (Enterprise). Thời gian phản hồi: trong vòng 4h làm việc.",
    category: "Hỗ trợ",
  },
  {
    id: "7",
    question: "Dữ liệu của tôi có bảo mật không?",
    answer: "CIC áp dụng tiêu chuẩn bảo mật cao nhất: Mã hóa dữ liệu end-to-end, Server đặt tại Việt Nam, tuân thủ Luật An ninh mạng, Backup tự động hàng ngày, và Cam kết không chia sẻ dữ liệu khách hàng cho bên thứ ba.",
    category: "Bảo mật",
  },
  {
    id: "8",
    question: "Phần mềm CIC tương thích với phần mềm nào?",
    answer: "CIC tương thích với các phần mềm phổ biến: AutoCAD, Revit, Navisworks, MS Project, Primavera, Excel, và nhiều định dạng file khác. Hệ thống cũng cung cấp API để tích hợp với các hệ thống nội bộ của doanh nghiệp.",
    category: "Tương thích",
  },
  {
    id: "9",
    question: "Tôi có thể chuyển đổi từ phần mềm khác sang CIC không?",
    answer: "Có. CIC có đội ngũ chuyên gia hỗ trợ migrate dữ liệu từ các phần mềm khác sang hệ thống CIC. Quá trình bao gồm: Đánh giá dữ liệu hiện tại, Kế hoạch migrate, Thực hiện chuyển đổi, và Kiểm tra xác nhận. Thường hoàn thành trong 1-2 tuần.",
    category: "Chuyển đổi",
  },
];

const CATEGORIES = ["Tất cả", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered = FAQS.filter((faq) => {
    const matchesSearch =
      search === "" ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Tất cả" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải đáp các thắc mắc về sản phẩm, dịch vụ và chính sách của CIC
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm câu hỏi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-full"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filtered.map((faq) => (
            <motion.div
              key={faq.id}
              initial={false}
              className="border border-border/60 rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Không tìm thấy câu hỏi phù hợp. Vui lòng{" "}
            <a href="/lien-he" className="text-accent underline">
              liên hệ CIC
            </a>{" "}
            để được hỗ trợ.
          </div>
        )}
      </div>
    </section>
  );
}
