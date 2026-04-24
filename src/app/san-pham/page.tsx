import Link from "next/link";
import { Search } from "lucide-react";
import type { Metadata } from "next";
import { getProducts, getProductCategories } from "@/lib/data";
import { CATEGORY_EMOJIS } from "@/lib/constants";
import { ProductCatalog } from "@/components/san-pham/product-catalog";
import { ShareButtons } from "@/components/ui/share-buttons";

// ISR: Revalidate products listing every 1 hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sản phẩm phần mềm | CIC Software",
  description: "Khám phá hơn 45 phần mềm chuyên ngành xây dựng, giao thông, thuỷ lợi, cơ khí, môi trường từ CIC.",
  openGraph: { title: "Sản phẩm phần mềm | CIC Software" },
};

interface PageProps {
  searchParams: Promise<{ linhvuc?: string }>;
}

export default async function SanPhamPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const categorySlug = sp.linhvuc || undefined;

  const [products, categories] = await Promise.all([
    getProducts(), // Fetch ALL products to allow client-side multi-select filtering
    getProductCategories(),
  ]);

  const activeCategory = categories.find(c => c.slug === categorySlug);

  return (
    <main className="min-h-screen bg-muted/10">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-6">
            Danh mục Giải pháp
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
            {activeCategory ? activeCategory.name_vi : 'Tất cả sản phẩm'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {activeCategory?.description_vi || 'Khám phá mảng phần mềm, giải pháp cho mọi lĩnh vực quy hoạch đô thị, công trình, khai khoáng và thuỷ lợi chuyên sâu.'}
          </p>
        </div>
      </section>

      {/* Catalog Render */}
      <ProductCatalog initialProducts={products} categories={categories} categorySlug={categorySlug} />
    </main>
  );
}
