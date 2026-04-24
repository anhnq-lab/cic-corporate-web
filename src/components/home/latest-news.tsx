import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import type { CmsPost } from "@/lib/types";
import { normalizeImageUrl } from "@/lib/utils";

interface LatestNewsProps {
  posts: CmsPost[];
}

export function LatestNews({ posts }: LatestNewsProps) {
  return (
    <section className="w-full pt-8 md:pt-10 pb-16 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Tin tức & Sự kiện</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Cập nhật mới nhất</h2>
          </div>
          <Link 
            href="/tin-tuc" 
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg hover:border-accent/20 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] bg-muted overflow-hidden rounded-t-2xl">
                  {/* Glare Shine Mask */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out pointer-events-none" />

                  {normalizeImageUrl(post.thumbnail_url) ? (
                    <Image 
                      src={normalizeImageUrl(post.thumbnail_url)!} 
                      alt={post.title_vi} 
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-accent/30" />
                    </div>
                  )}
                  {post.cms_categories && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-card/90 backdrop-blur text-foreground px-3 py-1 text-xs font-semibold rounded-full">
                        {post.cms_categories.name_vi}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {post.published_at && (
                    <div className="text-xs text-muted-foreground mb-2.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.published_at).toLocaleDateString('vi-VN')}
                    </div>
                  )}
                  <h3 className="text-[15px] font-bold mb-2.5 leading-snug group-hover:text-accent transition-colors font-heading line-clamp-2">
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title_vi}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                    {post.excerpt_vi || ''}
                  </p>
                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="text-accent font-semibold text-sm hover:underline inline-flex items-center mt-auto"
                  >
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-2xl border border-border/30">
            <Newspaper className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Chưa có bài viết nào. Vui lòng quay lại sau.</p>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/tin-tuc" className="text-sm font-semibold text-accent hover:underline inline-flex items-center">
            Xem tất cả tin tức <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
