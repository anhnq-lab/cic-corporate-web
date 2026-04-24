"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Shield,
  FileText,
  Layers,
  BarChart3,
  Users,
  Settings,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";

interface ProductNode {
  id: string;
  name: string;
  slug: string;
  icon: string;
  category: string;
  color: string;
  description: string;
}

const PRODUCT_DOMAINS = [
  {
    id: "planning",
    name: "Lập dự toán & Đấu thầu",
    icon: "FileText",
    color: "from-blue-500 to-blue-600",
    products: [
      { id: "du-toan", name: "CIC Dự Toán", slug: "cic-du-toan", description: "Lập dự toán xây dựng tự động theo định mức nhà nước" },
      { id: "dau-thau", name: "CIC Đấu Thầu", slug: "cic-dau-thau", description: "Quản lý quy trình đấu thầu chuyên nghiệp" },
      { id: "gia-phan-tich", name: "CIC Giá Phân Tích", slug: "gia-phan-tich", description: "Phân tích và quản lý đơn giá xây dựng" },
    ],
  },
  {
    id: "design",
    name: "Thiết kế & BIM",
    icon: "Building2",
    color: "from-purple-500 to-purple-600",
    products: [
      { id: "bim", name: "CIC BIM Manager", slug: "cic-bim-manager", description: "Quản lý mô hình BIM tích hợp" },
      { id: "thiet-ke", name: "CIC Thiết Kế", slug: "cic-thiet-ke", description: "Công cụ thiết kế kết cấu tự động" },
      { id: "3d-viewer", name: "CIC 3D Viewer", slug: "cic-3d-viewer", description: "Xem và duyệt mô hình 3D trực tuyến" },
    ],
  },
  {
    id: "management",
    name: "Quản lý dự án & CDE",
    icon: "Calendar",
    color: "from-green-500 to-green-600",
    products: [
      { id: "cde", name: "CIC CDE", slug: "cic-cde", description: "Môi trường dữ liệu chung cho dự án" },
      { id: "tien-do", name: "CIC Tiến Độ", slug: "cic-tien-do", description: "Quản lý tiến độ thi công Gantt chart" },
      { id: "chat-luong", name: "CIC Chất Lượng", slug: "cic-chat-luong", description: "Quản lý chất lượng và nghiệm thu" },
    ],
  },
  {
    id: "operations",
    name: "Vận hành & Bảo trì",
    icon: "Settings",
    color: "from-orange-500 to-orange-600",
    products: [
      { id: "van-hanh", name: "CIC Vận Hành", slug: "cic-van-hanh", description: "Quản lý vận hành tòa nhà" },
      { id: "bao-tri", name: "CIC Bảo Trì", slug: "cic-bao-tri", description: "Quản lý bảo trì thiết bị" },
      { id: "tai-san", name: "CIC Tài Sản", slug: "cic-tai-san", description: "Quản lý tài sản cố định" },
    ],
  },
  {
    id: "analytics",
    name: "Báo cáo & Phân tích",
    icon: "BarChart3",
    color: "from-cyan-500 to-cyan-600",
    products: [
      { id: "dashboard", name: "CIC Dashboard", slug: "cic-dashboard", description: "Bảng điều khiển và KPIs" },
      { id: "bao-cao", name: "CIC Báo Cáo", slug: "cic-bao-cao", description: "Xuất báo cáo tự động" },
      { id: "ai-insights", name: "CIC AI Insights", slug: "cic-ai-insights", description: "Phân tích dự báo bằng AI" },
    ],
  },
  {
    id: "collaboration",
    name: "Cộng tác & Tài liệu",
    icon: "Users",
    color: "from-pink-500 to-pink-600",
    products: [
      { id: "ho-so", name: "CIC Hồ Sơ", slug: "cic-ho-so", description: "Quản lý hồ sơ tài liệu" },
      { id: "phoi-hop", name: "CIC Phối Hợp", slug: "cic-phoi-hop", description: "Nền tảng cộng tác nhóm" },
      { id: "ky-so", name: "CIC Ký Số", slug: "cic-ky-so", description: "Ký số và phê duyệt điện tử" },
    ],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

export function ProductEcosystemMap() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const selectedData = PRODUCT_DOMAINS.find((d) => d.id === selectedDomain);

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Hệ sinh thái 45+ sản phẩm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải pháp toàn diện cho mọi giai đoạn của dự án xây dựng
          </p>
        </div>

        {/* Domain Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PRODUCT_DOMAINS.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() =>
                setSelectedDomain(selectedDomain === domain.id ? null : domain.id)
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border text-left transition-all ${
                selectedDomain === domain.id
                  ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                  : "border-border/60 bg-card hover:border-border/80"
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} text-white mb-4`}
              >
                {iconMap[domain.icon]}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{domain.name}</h3>
              <p className="text-sm text-muted-foreground">
                {domain.products.length} sản phẩm
              </p>

              {/* Mini product pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {domain.products.slice(0, 3).map((p) => (
                  <span
                    key={p.id}
                    className="text-[11px] px-2 py-0.5 bg-muted/50 rounded-full text-muted-foreground"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Selected Domain Detail */}
        <AnimatePresence>
          {selectedDomain && selectedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border/60 rounded-3xl p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedData.color} text-white`}
                  >
                    {iconMap[selectedData.icon]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading">{selectedData.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedData.products.length} giải pháp chuyên dụng
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="p-2 hover:bg-muted/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {selectedData.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group p-5 rounded-xl border border-border/40 hover:border-accent/50 hover:bg-accent/5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {product.name}
                      </h4>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        {!selectedDomain && (
          <div className="text-center mt-8">
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              Xem tất cả sản phẩm
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
