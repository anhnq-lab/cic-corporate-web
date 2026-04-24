"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GAnalyticsProps {
  measurementId?: string;
}

export function GAnalytics({ measurementId }: GAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || typeof window === "undefined") return;

    // Load gtag script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", measurementId, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      send_page_view: true,
    });

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [measurementId, pathname, searchParams]);

  return null;
}

// Custom event tracking
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === "undefined" || !window.dataLayer) return;

  window.dataLayer.push({
    event: eventName,
    ...eventParams,
  });
}

// Common event helpers
export const trackEvents = {
  ctaClick: (ctaName: string, ctaLocation: string) =>
    trackEvent("cta_click", { cta_name: ctaName, cta_location: ctaLocation }),

  productView: (productName: string, productSlug: string) =>
    trackEvent("product_view", { product_name: productName, product_slug: productSlug }),

  search: (query: string, resultsCount: number) =>
    trackEvent("search", { search_term: query, results_count: resultsCount }),

  demoBooking: (demoType: string) =>
    trackEvent("demo_booking", { demo_type: demoType }),

  newsletterSignup: (source: string) =>
    trackEvent("newsletter_signup", { source }),

  chatOpen: () =>
    trackEvent("chat_open"),

  chatMessage: (messageLength: number) =>
    trackEvent("chat_message", { message_length: messageLength }),

  fileDownload: (fileName: string, fileType: string) =>
    trackEvent("file_download", { file_name: fileName, file_type: fileType }),

  scrollDepth: (percentage: number) =>
    trackEvent("scroll_depth", { percentage }),

  timeOnPage: (seconds: number) =>
    trackEvent("time_on_page", { seconds }),
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}
