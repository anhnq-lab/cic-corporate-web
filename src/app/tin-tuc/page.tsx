import Link from "next/link";
import Image from "next/image";
import { Calendar, Newspaper, Search, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { getNewsPaginated, getNewsCategories, getFeaturedNews } from "@/lib/data";
import { normalizeImageUrl } from "@/lib/utils";
import type { CmsPost } from "@/lib/types";

// ISR: Revalidate news listing every 30 minutes
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | CIC Software",
  description: "Cập nhật tin tức mới nhất về phần mềm xây dựng, giải pháp công nghệ, sự kiện hội thảo từ CIC.",
  openGraph: { title: "Tin tức & Sự kiện | CIC Software" },
};

interface PageProps {
  searchParams: Promise<{ page?: string; danh_muc?: string }>;
}

function FeaturedArticle({ post, isLarge = false }: { post: CmsPost, isLarge?: boolean }) {
  const imageUrl = normalizeImageUrl(post.thumbnail_url);
  return (
    <Link href={`/tin-tuc/${post.slug}`} className="group relative block w-full h-full rounded-[1.25rem] overflow-hidden bg-muted border border-border/30">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={post.title_vi}
          fill
          sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex flex-col items-center justify-center">
          <Newspaper className="w-12 h-12 text-accent/40 mb-2" />
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 lg:p-7">
        {post.cms_categories && (
          <span className="w-fit bg-accent text-white px-3 py-1.5 text-[11px] font-bold rounded-lg mb-3 uppercase tracking-wider backdrop-blur-sm shadow-sm">
            {post.cms_categories.name_vi}
          </span>
        )}
        <h3 className={`font-bold text-white leading-snug font-heading group-hover:text-accent-foreground transition-colors line-clamp-3 ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
          {post.title_vi}
        </h3>
        {post.published_at && (
          <div className="text-gray-300 text-xs sm:text-sm mt-3 flex items-center gap-2 opacity-90 font-medium">
            <Calendar className="w-4 h-4" />
            {new Date(post.published_at).toLocaleDateString('vi-VN')}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const categorySlug = sp.danh_muc || undefined;

  const [newsResult, categories, featuredNews] = await Promise.all([
    getNewsPaginated(page, categorySlug),
    getNewsCategories(),
    (!categorySlug && page === 1) ? getFeaturedNews(5) : Promise.resolve([]),
  ]);

  const { items: posts, totalPages, total, hasNext, hasPrev } = newsResult;
  const showFeatured = featuredNews.length > 0;
  
  // Xử lý bài viết nổi bật: 1 bài chính, 4 bài phụ
  const topFeatured = featuredNews[0];
  const sideFeatures = featuredNews.slice(1, 5);

  return (
    <main className="min-h-screen pb-20">
      
      {/* Header gọn gàng giống trang chuyên công nghệ */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-background border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-foreground tracking-tight">Vũ trụ phần mềm & Công nghệ</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Tin tức chuyên ngành, giải pháp chuyển đổi số, sự kiện trực tuyến và thông cáo từ CIC.
          </p>
        </div>
      </section>

      {/* Thanh Phân Loại Thông Minh - Sticky */}
      <section className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-xl border-b border-border/40 py-3 shadow-sm transition-all">
        <div className="container max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar gap-2 lg:gap-3">
          <Link
            href="/tin-tuc"
            className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-xl transition-all ${
              !categorySlug 
                ? 'bg-accent text-white shadow-md shadow-accent/20' 
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            Tất cả tin tức
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/tin-tuc?danh_muc=${cat.slug}`}
              className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                categorySlug === cat.slug 
                  ? 'bg-accent text-white shadow-md shadow-accent/20' 
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat.name_vi}
            </Link>
          ))}
        </div>
      </section>

      {/* Khối Tin Nổi Bật (Tương đương Slider/Banner) */}
      {showFeatured && (
        <section className="container max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-[520px]">
             {/* Main Featured Article */}
             {topFeatured && (
               <div className="lg:col-span-7 h-[350px] sm:h-[450px] lg:h-full">
                 <FeaturedArticle post={topFeatured} isLarge={true} />
               </div>
             )}
             {/* Top 4 Additional Featured Articles */}
             <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6 h-auto lg:h-full">
               {sideFeatures.map(post => (
                 <div key={post.id} className="h-[200px] sm:h-[250px] lg:h-full lg:min-h-0">
                   <FeaturedArticle post={post} />
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* Danh sách bài Mới Cập Nhật */}
      <section className={`container max-w-7xl mx-auto px-4 ${!showFeatured ? 'py-10' : 'pb-10 pt-4'}`}>
        <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
          <h2 className="text-2xl font-bold font-heading flex items-center gap-2 tracking-tight">
            {!categorySlug ? "Mới cập nhật" : (categories.find(c => c.slug === categorySlug)?.name_vi || "Danh mục")}
            <ChevronRight className="w-5 h-5 text-accent" />
          </h2>
          <span className="text-sm font-semibold text-muted-foreground bg-muted/60 px-3.5 py-1.5 rounded-lg border border-border/50">{total} bài báo</span>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-card rounded-[1.25rem] overflow-hidden hover:bg-muted/40 transition-colors duration-300 border border-border/40 hover:border-accent/30 shadow-sm hover:shadow-md"
              >
                <Link href={`/tin-tuc/${post.slug}`} className="relative aspect-[16/10] bg-muted overflow-hidden">
                  {normalizeImageUrl(post.thumbnail_url) ? (
                    <Image
                      src={normalizeImageUrl(post.thumbnail_url)!}
                      alt={post.title_vi}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/5 flex items-center justify-center">
                      <Newspaper className="w-8 h-8 text-accent/30" />
                    </div>
                  )}
                  {post.cms_categories && (
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="bg-background/95 backdrop-blur-md text-foreground px-3 py-1.5 text-[10px] font-extrabold rounded-md shadow-sm uppercase tracking-widest text-accent">
                        {post.cms_categories.name_vi}
                      </span>
                    </div>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[17px] font-bold mb-3 leading-snug group-hover:text-accent transition-colors font-heading line-clamp-3">
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title_vi}</Link>
                  </h3>
                  
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/50">
                    {post.published_at ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.published_at).toLocaleDateString('vi-VN')}
                      </div>
                    ) : <div/>}
                    
                    <span className="text-xs font-bold text-accent group-hover:underline underline-offset-4">Xem chi tiết</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-muted/20 rounded-[2rem] border border-dashed border-border/60">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-muted-foreground text-xl font-medium tracking-tight">Chưa có bài viết nào trong mục này.</p>
          </div>
        )}

        {/* Phân trang tinh tế */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 pb-8">
            {hasPrev && (
              <Link
                href={`/tin-tuc?page=${page - 1}${categorySlug ? `&danh_muc=${categorySlug}` : ''}`}
                className="px-5 py-2.5 text-sm font-bold rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all bg-card"
              >
                ← Trước
              </Link>
            )}
            <div className="flex items-center gap-1.5 px-3">
               {Array.from({length: totalPages}, (_, i) => i + 1).map(p => {
                 if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                   return (
                     <Link
                        key={p}
                        href={`/tin-tuc?page=${p}${categorySlug ? `&danh_muc=${categorySlug}` : ''}`}
                        className={`w-11 h-11 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                          page === p 
                            ? 'bg-accent text-white shadow-md shadow-accent/20' 
                            : 'hover:bg-muted border border-transparent hover:border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {p}
                      </Link>
                   );
                 }
                 if (p === page - 2 || p === page + 2) {
                   return <span key={p} className="px-1 text-muted-foreground/30 font-bold tracking-widest">...</span>
                 }
                 return null;
               })}
            </div>
            {hasNext && (
              <Link
                href={`/tin-tuc?page=${page + 1}${categorySlug ? `&danh_muc=${categorySlug}` : ''}`}
                className="px-5 py-2.5 text-sm font-bold rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all bg-card"
              >
                Tiếp →
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
