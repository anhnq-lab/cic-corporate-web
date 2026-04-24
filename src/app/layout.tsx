import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { GAnalytics } from "@/components/ui/analytics";

import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { AdBanner } from "@/components/ui/ad-banner";
import { FloatingContact } from "@/components/ui/floating-contact";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cic.com.vn"),
  title: "CIC - Giải Pháp Phần Mềm Chuyên Ngành Xây Dựng",
  description: "Công ty CP Công nghệ và Tư vấn CIC — hơn 30 năm phát triển phần mềm chuyên ngành xây dựng, giao thông, thuỷ lợi. Hệ sinh thái 45+ sản phẩm phục vụ 10,000+ doanh nghiệp.",
  keywords: ["CIC", "Phần mềm xây dựng", "Phần mềm dự toán", "BIM", "CDE", "Phần mềm giao thông"],
  openGraph: {
    title: "CIC — Phần Mềm Chuyên Ngành Xây Dựng Hàng Đầu Việt Nam",
    description: "Hệ sinh thái 45+ giải pháp phần mềm cho xây dựng, giao thông, thuỷ lợi và công nghiệp. Đối tác tin cậy của 10,000+ doanh nghiệp.",
    url: "https://cic.com.vn",
    siteName: "CIC Software",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "vi_VN",
    type: "website"
  }
};

import { getNavItems } from "@/lib/data";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavItems();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Công ty CP Công nghệ và Tư vấn CIC",
    "url": "https://cic.com.vn",
    "logo": "https://cic.com.vn/cic-logo.png",
    "description": "CIC — nhà tiên phong phát triển phần mềm chuyên ngành xây dựng, giao thông, thuỷ lợi tại Việt Nam với hơn 30 năm kinh nghiệm.",
    "foundingDate": "1990",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tầng 4, Tòa nhà VG Building, 235 Nguyễn Trãi",
      "addressLocality": "Hà Nội",
      "addressCountry": "VN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-86-893-4576",
      "contactType": "customer service"
    }
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${plusJakarta.variable} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          <NoiseOverlay />
          <ReadingProgress />

          <LenisProvider>
            <Navbar items={navItems} />
            <Breadcrumb />
            <main className="flex-1 w-full relative">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
              />
              {children}
            </main>
            <Footer />
            <ScrollToTop />
            <FloatingContact />
            <ChatbotWidget />
            <AdBanner />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
