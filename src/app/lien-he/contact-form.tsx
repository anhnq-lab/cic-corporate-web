"use client";

import { useActionState } from "react";
import { handleContactSubmit, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactFormState = {
  success: false,
  submitted: false,
};

interface ContactFormProps {
  productSlug?: string;
}

export function ContactForm({ productSlug }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(handleContactSubmit, initialState);

  if (state.submitted && state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold font-heading">Gửi thành công!</h3>
        <p className="text-muted-foreground max-w-md">
          Cảm ơn bạn đã liên hệ. Đội ngũ tư vấn CIC sẽ phản hồi trong vòng 24 giờ làm việc.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {productSlug && (
        <input type="hidden" name="productSlug" value={productSlug} />
      )}

      {state.submitted && state.error && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
            Họ và tên <span className="text-destructive">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Nguyễn Văn A"
            className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0912 345 678"
            className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="email@congty.vn"
          className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
          Tên công ty / Tổ chức
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Công ty TNHH ABC"
          className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Nội dung tư vấn
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Mô tả nhu cầu phần mềm hoặc dịch vụ tư vấn của bạn..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full md:w-auto bg-accent text-white hover:bg-accent/90 rounded-full font-semibold px-8 glow-accent disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Gửi yêu cầu
          </>
        )}
      </Button>
    </form>
  );
}
