"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlanFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  popular?: boolean;
  features: PlanFeature[];
  cta: string;
  ctaLink: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Dành cho cá nhân & freelancer",
    price: 0,
    period: "/tháng",
    features: [
      { name: "1 người dùng", included: true },
      { name: "5 dự án", included: true },
      { name: "Lập dự toán cơ bản", included: true },
      { name: "Xuất file PDF", included: true },
      { name: "Hỗ trợ qua email", included: true },
      { name: "Quản lý vật tư", included: false },
      { name: "BIM Integration", included: false },
      { name: "API Access", included: false },
    ],
    cta: "Bắt đầu miễn phí",
    ctaLink: "/lien-he",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Dành cho nhóm & doanh nghiệp vừa",
    price: 2500000,
    period: "/tháng",
    popular: true,
    features: [
      { name: "10 người dùng", included: true },
      { name: "Không giới hạn dự án", included: true },
      { name: "Lập dự toán nâng cao", included: true },
      { name: "Xuất file PDF, Excel", included: true },
      { name: "Hỗ trợ ưu tiên 24/7", included: true },
      { name: "Quản lý vật tư", included: true },
      { name: "BIM Integration", included: false },
      { name: "API Access", included: false },
    ],
    cta: "Đăng ký dùng thử",
    ctaLink: "/lien-he",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Dành cho doanh nghiệp lớn & tập đoàn",
    price: 0,
    period: "Liên hệ",
    features: [
      { name: "Không giới hạn người dùng", included: true },
      { name: "Không giới hạn dự án", included: true },
      { name: "Tất cả tính năng", included: true },
      { name: "Xuất mọi định dạng", included: true },
      { name: "Hỗ trợ riêng 1-1", included: true },
      { name: "Quản lý vật tư nâng cao", included: true },
      { name: "BIM Integration", included: true },
      { name: "API Access đầy đủ", included: true },
    ],
    cta: "Liên hệ tư vấn",
    ctaLink: "/lien-he",
  },
];

// Pricing Calculator
function PricingCalculator() {
  const [users, setUsers] = useState(5);
  const [modules, setModules] = useState<string[]>(["budget"]);
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly");

  const MODULES = [
    { id: "budget", name: "Lập dự toán", price: 1000000 },
    { id: "bim", name: "BIM Management", price: 2000000 },
    { id: "scheduling", name: "Tiến độ thi công", price: 1500000 },
    { id: "quality", name: "Quản lý chất lượng", price: 1200000 },
    { id: "document", name: "Quản lý hồ sơ", price: 800000 },
    { id: "cost", name: "Quản lý chi phí", price: 1500000 },
  ];

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const total = useMemo(() => {
    const moduleCost = modules.reduce((sum, id) => {
      const mod = MODULES.find((m) => m.id === id);
      return sum + (mod?.price || 0);
    }, 0);
    const userCost = users * 200000;
    const subtotal = moduleCost + userCost;
    return period === "yearly" ? subtotal * 12 * 0.85 : subtotal; // 15% discount yearly
  }, [users, modules, period, MODULES]);

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold mb-6">Tính giá theo nhu cầu</h3>

      {/* Period toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-sm ${period === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
          Tháng
        </span>
        <button
          onClick={() => setPeriod(period === "monthly" ? "yearly" : "monthly")}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            period === "yearly" ? "bg-accent" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              period === "yearly" ? "translate-x-6" : ""
            }`}
          />
        </button>
        <span className={`text-sm ${period === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
          Năm <span className="text-green-500 font-medium">(-15%)</span>
        </span>
      </div>

      {/* Users slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Số người dùng</label>
          <span className="text-lg font-bold">{users}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {/* Modules */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-3 block">Module cần dùng</label>
        <div className="grid grid-cols-2 gap-2">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => toggleModule(mod.id)}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                modules.includes(mod.id)
                  ? "bg-accent/10 border-accent text-accent border"
                  : "bg-muted/30 border-border/40 border text-muted-foreground hover:border-border/60"
              }`}
            >
              <div className="font-medium">{mod.name}</div>
              <div className="text-xs opacity-70">
                {(mod.price / 1000000).toFixed(1)}M/tháng
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border/60 pt-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Tổng chi phí</div>
            <div className="text-3xl font-bold font-heading text-foreground">
              {(total / 1000000).toFixed(1)}M
              <span className="text-sm text-muted-foreground font-normal">
                /{period === "yearly" ? "năm" : "tháng"}
              </span>
            </div>
          </div>
        </div>
        <Button className="w-full bg-accent text-white hover:bg-accent/90 rounded-full" asChild>
          <a href="/lien-he">
            Nhận báo giá chi tiết
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function PricingSection() {
  const formatPrice = (price: number) => {
    if (price === 0) return "Miễn phí";
    return `${(price / 1000000).toFixed(1)}M`;
  };

  return (
    <section className="w-full py-16 md:py-24 relative">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Bảng giá phần mềm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lựa chọn gói phù hợp nhất với nhu cầu của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-6 flex flex-col ${
                  plan.popular
                    ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                    : "border-border/60 bg-card"
                }`}
              >
                {plan.popular && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full w-fit mb-3">
                    Phổ biến nhất
                  </span>
                )}

                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold font-heading">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full rounded-full ${
                    plan.popular ? "bg-accent text-white hover:bg-accent/90" : ""
                  }`}
                  asChild
                >
                  <a href={plan.ctaLink}>{plan.cta}</a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Calculator */}
          <PricingCalculator />
        </div>
      </div>
    </section>
  );
}
