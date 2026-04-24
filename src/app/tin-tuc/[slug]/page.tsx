import { getNewsArticle, getAllNewsSlugs, getRelatedNews } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, ChevronRight, Eye, ArrowRight, User } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { normalizeImageUrl } from "@/lib/utils";
import { ShareButtons } from "@/components/ui/share-buttons";
import { ReadingProgress } from "@/components/ui/reading-progress";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: "Bài viết không tồn tại" };

  return {
    title: `${article.seo_title_vi || article.title_vi} | CIC Software`,
    description: article.seo_description_vi || article.excerpt_vi || '',
    openGraph: {
      title: article.seo_title_vi || article.title_vi,
      description: article.seo_description_vi || article.excerpt_vi || '',
      type: "article",
      publishedTime: article.published_at || undefined,
      images: normalizeImageUrl(article.thumbnail_url) ? [normalizeImageUrl(article.thumbnail_url)!] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  const related = await getRelatedNews(slug, 4);

  const authorName = article.author_name || 'Ban biên tập CIC';

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.seo_title_vi || article.title_vi,
    "image": normalizeImageUrl(article.thumbnail_url) ? [normalizeImageUrl(article.thumbnail_url)] : [],
    "datePublished": article.published_at || undefined,
    "author": [{ "@type": "Person", "name": authorName, "url": "https://cic.com.vn/gioi-thieu" }],
    "publisher": {
      "@type": "Organization",
      "name": "Công ty CP Công nghệ và Tư vấn CIC",
      "logo": { "@type": "ImageObject", "url": "https://cic.com.vn/cic-logo.png" }
    }
  };

  const categoryName = article.cms_categories?.name_vi || '';

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      {/* Breadcrumb */}
      <section className="w-full pt-16 pb-6 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/tin-tuc" className="hover:text-foreground transition-colors">Tin tức</Link>
            {categoryName && (
              <>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground font-medium line-clamp-1">{categoryName}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="w-full px-4 mb-8">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-6 space-y-4">
            {categoryName && (
              <span className="bg-accent/10 text-accent px-3 py-1 text-sm font-semibold rounded-full">
                {categoryName}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold font-heading tracking-tight leading-tight">
              {article.title_vi}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap pt-1">
              {article.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_at).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {authorName}
              </span>
              {(article.view_count || 0) > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {article.view_count.toLocaleString()} lượt xem
                </span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {normalizeImageUrl(article.thumbnail_url) && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
              <Image src={normalizeImageUrl(article.thumbnail_url)!} alt={article.title_vi} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" priority />
            </div>
          )}

          {/* Summary */}
          {article.excerpt_vi && (
            <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-5 mb-8">
              <p className="text-foreground/80 leading-relaxed font-medium italic">{article.excerpt_vi}</p>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert 
              prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-foreground
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8
              prose-strong:text-foreground
              prose-table:border prose-table:border-border/50 prose-th:bg-muted/50
              prose-td:border prose-td:border-border/30 prose-th:border prose-th:border-border/30
              prose-td:px-4 prose-td:py-2 prose-th:px-4 prose-th:py-2"
            dangerouslySetInnerHTML={{
              __html: (article.content_vi || '<p>Nội dung đang được cập nhật.</p>')
                .replace(/>(?:rn)+(\s*)</g, '>$1<') // Xóa rn nằm giữa các tag
                .replace(/^(?:rn)+</g, '<') // Xóa rn ở đầu
                .replace(/>(?:rn)+$/g, '>') // Xóa rn ở cuối
                .replace(/rnrn/g, '<br/><br/>') // Fallback cho text thuần
                .replace(/src="\/upload_images\//gi, 'src="https://cic.com.vn/upload_images/')
                .replace(/src="\/images\//gi, 'src="https://cic.com.vn/images/')
                .replace(/src="\/uploads\//gi, 'src="https://cic.com.vn/uploads/')
            }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="bg-muted px-3 py-1 text-sm rounded-full text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <ShareButtons title={article.title_vi} />
          </div>

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full px-4 mt-8">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold font-heading mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(post => (
                <article key={post.id} className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md hover:border-accent/20 transition-all">
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    {normalizeImageUrl(post.thumbnail_url) ? (
                      <Image src={normalizeImageUrl(post.thumbnail_url)!} alt={post.title_vi} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent/20">CIC</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    {post.published_at && (
                      <div className="text-xs text-muted-foreground mb-2">{new Date(post.published_at).toLocaleDateString('vi-VN')}</div>
                    )}
                    <h3 className="text-sm font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/tin-tuc/${post.slug}`}>{post.title_vi}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
