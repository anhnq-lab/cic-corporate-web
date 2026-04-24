"use server";

import { submitContact } from "@/lib/data";

export interface ContactFormState {
  success: boolean;
  error?: string;
  submitted: boolean;
}

export async function handleContactSubmit(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const company = formData.get("company")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const productSlug = formData.get("productSlug")?.toString().trim();

  // Validation
  if (!fullName || fullName.length < 2) {
    return { success: false, error: "Vui lòng nhập họ và tên.", submitted: true };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Vui lòng nhập email hợp lệ.", submitted: true };
  }

  const result = await submitContact({
    full_name: fullName,
    email,
    phone: phone || undefined,
    company: company || undefined,
    message: message || undefined,
    product_slug: productSlug || undefined,
  });

  if (!result.success) {
    return { success: false, error: result.error || "Có lỗi xảy ra, vui lòng thử lại.", submitted: true };
  }

  return { success: true, submitted: true };
}
