import { getProductBySlug, getAllProductSlugs, getProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Package, Calendar, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Sản phẩm không tồn tại" };

  return {
    title: `${product.seo_title || product.name} | CIC Software`,
    description: product.seo_description || product.description || product.name,
    openGraph: {
      title: `${product.seo_title || product.name} | Phần mềm CIC`,
      description: product.seo_description || product.description || '',
      images: product.thumbnail_url ? [product.thumbnail_url] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Related products (same category or all)
  const allProducts = await getProducts();
  const related = allProducts.filter(p => p.slug !== slug).slice(0, 4);

  const categoryName = product.cms_categories?.name_vi || '';

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "applicationCategory": "BusinessApplication",
    "description": product.description || product.name,
    "image": product.thumbnail_url || undefined,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND",
      "availability": "https://schema.org/InStock",
      "url": `https://cic.com.vn/san-pham/${product.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Công ty CP Công nghệ và Tư vấn CIC"
    }
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <section className="w-full pt-16 pb-6 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/san-pham" className="hover:text-foreground transition-colors">Sản phẩm</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Product Overview */}
      <section className="w-full py-10 px-4 bg-muted/30 border-b border-border/50">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Product Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background border border-border/50 shadow-sm p-6 flex items-center justify-center">
              {product.thumbnail_url ? (
                <Image src={product.thumbnail_url} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
              ) : (
                <Package className="w-32 h-32 text-muted-foreground/20" />
              )}
              {product.is_featured_web && (
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-white px-3 py-1 text-xs font-bold rounded-full">
                    ⭐ NỔI BẬT
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                {categoryName && (
                  <span className="bg-accent/10 text-accent px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    {categoryName}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                  {product.name}
                </h1>
              </div>

              {product.description && (
                <div className="text-lg text-foreground/80 leading-relaxed italic">
                  {product.description}
                </div>
              )}

              {/* Gallery preview */}
              {product.gallery_urls && product.gallery_urls.length > 0 && (
                <div className="flex gap-2">
                  {product.gallery_urls.slice(0, 4).map((url, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-border/50 bg-muted">
                      <Image src={url} alt={`${product.name} ${i + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <Link href={`/lien-he?product=${product.slug}`}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8">
                    Nhận tư vấn ngay
                  </Button>
                </Link>
                <Link href="/lien-he">
                  <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold">
                    Yêu cầu báo giá
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Content Details */}
      <section className="w-full py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold font-heading mb-8 pb-4 border-b border-border/50">
              Thông tin chi tiết
            </h2>
            
            {product.content ? (
               <div
                  className="prose prose-lg max-w-none dark:prose-invert 
                    prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-foreground
                    prose-p:text-foreground/80 prose-p:leading-relaxed
                    prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
                    prose-strong:text-foreground
                    prose-ul:text-foreground/80
                    prose-li:marker:text-accent
                    prose-table:border prose-table:border-border/50 prose-th:bg-muted/50
                    prose-td:border prose-td:border-border/30 prose-th:border prose-th:border-border/30
                    prose-td:px-4 prose-td:py-2 prose-th:px-4 prose-th:py-2"
                  dangerouslySetInnerHTML={{ __html: product.content }}
               />
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    Đang cập nhật thông tin chi tiết.
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="w-full px-4 mt-8">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" /> Sản phẩm khác
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/san-pham/${p.slug}`}
                  className="group flex flex-col items-center bg-card border border-border/50 rounded-xl p-4 hover:shadow-md hover:border-accent/20 transition-all text-center"
                >
                  <div className="w-14 h-14 mb-3 flex items-center justify-center bg-muted/50 rounded-lg overflow-hidden">
                    {p.thumbnail_url ? (
                      <Image src={p.thumbnail_url} alt={p.name} width={40} height={40} className="object-contain" />
                    ) : (
                      <Package className="w-6 h-6 text-muted-foreground/30" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
