"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Building2, Phone, Mail, Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface DemoFormProps {
  onClose: () => void;
}

const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const DEMO_TYPES = [
  { id: "general", name: "Giới thiệu tổng quan", duration: "30 phút" },
  { id: "budget", name: "Lập dự toán & Đấu thầu", duration: "45 phút" },
  { id: "bim", name: "BIM Management", duration: "60 phút" },
  { id: "cde", name: "Quản lý dự án (CDE)", duration: "45 phút" },
  { id: "enterprise", name: "Giải pháp Enterprise", duration: "60 phút" },
];

export function DemoBookingForm({ onClose }: DemoFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    demoType: "general",
    date: "",
    timeSlot: "",
    attendees: "1-5",
    message: "",
  });

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.timeSlot) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      toast.success("Đặt lịch demo thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // Get next 7 business days
  const getNextBusinessDays = () => {
    const days = [];
    let date = new Date();
    while (days.length < 7) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        days.push(new Date(date));
      }
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateDisplay = (date: Date) => {
    const day = date.toLocaleDateString("vi-VN", { weekday: "short" });
    const num = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    return { day, num, value: formatDate(date) };
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border/60 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/40 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold font-heading">Đặt lịch Demo</h2>
            <p className="text-sm text-muted-foreground">
              Trải nghiệm phần mềm CIC miễn phí
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Thông tin</span>
            <span>Lịch trình</span>
            <span>Xác nhận</span>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Đặt lịch thành công!</h3>
              <p className="text-muted-foreground mb-2">
                Chúng tôi sẽ xác nhận lịch demo qua email trong vòng 2h làm việc.
              </p>
              <p className="text-sm text-muted-foreground/60">
                Ngày: {form.date} | Giờ: {form.timeSlot}
              </p>
              <Button onClick={onClose} className="mt-6 rounded-full bg-accent text-white">
                Đóng
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Step 1: Contact Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="demo-name">Họ tên *</Label>
                    <Input
                      id="demo-name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="demo-email">Email *</Label>
                      <Input
                        id="demo-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-phone">SĐT *</Label>
                      <Input
                        id="demo-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="0901234567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="demo-company">Công ty</Label>
                      <Input
                        id="demo-company"
                        value={form.company}
                        onChange={(e) => updateForm("company", e.target.value)}
                        placeholder="Tên công ty"
                      />
                    </div>
                    <div>
                      <Label htmlFor="demo-role">Chức vụ</Label>
                      <Input
                        id="demo-role"
                        value={form.role}
                        onChange={(e) => updateForm("role", e.target.value)}
                        placeholder="Giám đốc / Kỹ sư..."
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full rounded-full bg-accent text-white"
                    disabled={!form.name || !form.email || !form.phone}
                  >
                    Tiếp tục
                  </Button>
                </div>
              )}

              {/* Step 2: Schedule */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Demo Type */}
                  <div>
                    <Label>Loại demo</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {DEMO_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => updateForm("demoType", type.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            form.demoType === type.id
                              ? "border-accent bg-accent/5"
                              : "border-border/40 hover:border-border/60"
                          }`}
                        >
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.duration}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label>Chọn ngày</Label>
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                      {getNextBusinessDays().map((date) => {
                        const formatted = formatDateDisplay(date);
                        return (
                          <button
                            key={formatted.value}
                            onClick={() => updateForm("date", formatted.value)}
                            className={`flex-shrink-0 p-3 rounded-xl border text-center min-w-[70px] transition-all ${
                              form.date === formatted.value
                                ? "border-accent bg-accent/10"
                                : "border-border/40 hover:border-border/60"
                            }`}
                          >
                            <div className="text-xs text-muted-foreground">{formatted.day}</div>
                            <div className="text-lg font-bold">{formatted.num}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <Label>Chọn giờ</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => updateForm("timeSlot", slot)}
                          className={`p-2 rounded-lg border text-sm text-center transition-all ${
                            form.timeSlot === slot
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border/40 hover:border-border/60"
                          }`}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="demo-message">Ghi chú</Label>
                    <Textarea
                      id="demo-message"
                      value={form.message}
                      onChange={(e) => updateForm("message", e.target.value)}
                      placeholder="Yêu cầu hoặc nội dung muốn tập trung..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">
                      Quay lại
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 rounded-full bg-accent text-white"
                      disabled={!form.date || !form.timeSlot}
                    >
                      Xem lại
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                    <h3 className="font-semibold">Thông tin đặt lịch</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Họ tên:</span>
                        <div className="font-medium">{form.name}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-medium">{form.email}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Công ty:</span>
                        <div className="font-medium">{form.company || "—"}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SĐT:</span>
                        <div className="font-medium">{form.phone}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loại demo:</span>
                        <div className="font-medium">
                          {DEMO_TYPES.find((t) => t.id === form.demoType)?.name}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Thời gian:</span>
                        <div className="font-medium">{form.date} | {form.timeSlot}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full">
                      Quay lại
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 rounded-full bg-accent text-white"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Xác nhận đặt lịch"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Button trigger component
export function DemoBookingButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={className}
        size="lg"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Đặt lịch Demo
      </Button>

      <AnimatePresence>
        {open && <DemoBookingForm onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
