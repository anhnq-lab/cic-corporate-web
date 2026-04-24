"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call (Resend, SendGrid, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      toast.success("Đăng ký nhận tin thành công!");
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-muted/50 to-muted/20 border border-border/60 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-3">
            Nhận tin tức & ưu đãi mới nhất
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Đăng ký để nhận thông tin sản phẩm mới, cập nhật công nghệ và ưu đãi đặc biệt dành cho subscriber
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-full pr-12"
                disabled={loading || success}
              />
              {success && (
                <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading || success}
              className="h-12 px-8 rounded-full bg-accent text-white hover:bg-accent/90 whitespace-nowrap"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : success ? (
                "Đã đăng ký ✓"
              ) : (
                <>
                  Đăng ký
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground/60 mt-4">
            Không spam. Hủy đăng ký bất cứ lúc nào.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
