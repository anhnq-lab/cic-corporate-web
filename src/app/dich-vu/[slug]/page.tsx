import { getServiceBySlug, getServices } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Briefcase, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { TocSidebar } from "./TocSidebar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Dịch vụ không tồn tại" };

  return {
    title: `${service.seo_title_vi || service.name_vi} | CIC Software`,
    description: service.seo_description_vi || service.description_vi || '',
    openGraph: {
      title: service.seo_title_vi || service.name_vi,
      description: service.seo_description_vi || service.description_vi || '',
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map(s => ({ slug: s.slug }));
}

function parseContent(html: string | null) {
  const toc: { id: string, text: string, level: number }[] = [];
  if (!html) return { toc, parsedHtml: '' };

  // Parse HTML string to inject IDs into H2 and H3 and build TOC array
  const parsedHtml = html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    // Basic stripping of inner HTML tags from text
    const cleanText = text.replace(/<[^>]+>/g, '').trim();
    // Create an ID
    const idStr = `toc-heading-${toc.length}`;
    toc.push({ level: parseInt(level), id: idStr, text: cleanText });
    return `<h${level}${attrs} id="${idStr}">${text}</h${level}>`;
  });

  return { 
    toc, 
    parsedHtml: parsedHtml.replace(/rnrn/g, '<br/><br/>')
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const { toc, parsedHtml } = parseContent(service.content_vi);

  return (
    <div className="flex flex-col w-full pb-20 bg-background/50">
      {/* Breadcrumbs */}
      <section className="w-full pt-20 pb-8 px-4 bg-card border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />
        <div className="container max-w-6xl mx-auto flex flex-col items-start gap-4">
          <div className="flex items-center text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 mx-1.5" />
            <Link href="/dich-vu" className="hover:text-foreground transition-colors">Dịch vụ</Link>
            <ChevronRight className="w-4 h-4 mx-1.5" />
            <span className="text-foreground font-medium">{service.name_vi}</span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            {service.icon_url ? (
              <img src={service.icon_url} alt="" className="w-14 h-14 object-contain" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                <Briefcase className="w-7 h-7 text-accent" />
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight tracking-tight leading-tight">
              {service.name_vi}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mt-2 leading-relaxed">
            {service.description_vi}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="container max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 order-2 lg:order-1">
            {parsedHtml ? (
              <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert 
                    prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight 
                    prose-h2:text-accent prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2
                    prose-h3:text-foreground prose-h3:mt-8
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-li:text-muted-foreground prose-li:marker:text-accent
                    prose-strong:text-foreground
                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
                  dangerouslySetInnerHTML={{ __html: parsedHtml }}
                />

                {/* Sub-CTA within content */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#0F1D32] to-[#162A46] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-accent/20">
                  <div className="relative z-10 w-full md:w-2/3">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading">Sẵn sàng để bắt đầu?</h3>
                    <p className="text-slate-300">Nhấp vào nút bên cạnh để trao đổi chi tiết giải pháp cho bài toán của doanh nghiệp bạn với chuyên gia CIC.</p>
                  </div>
                  <div className="relative z-10 w-full md:w-1/3 flex justify-end">
                    <Link href={`/lien-he?service=${service.slug}`} className="w-full">
                      <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white rounded-full font-bold glow-accent shadow-xl h-14">
                        <PhoneCall className="w-5 h-5 mr-2" />
                        Liên hệ tư vấn
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
               <div className="text-center py-24 bg-card border border-border/50 rounded-3xl">
                 <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" />
                 <h2 className="text-xl font-medium text-foreground mb-4">Chi tiết dịch vụ đang được cập nhật</h2>
                 <Link href={`/lien-he?service=${service.slug}`}>
                    <Button className="rounded-full bg-accent text-white hover:bg-accent/90 px-8">
                       Liên hệ để biết thêm chi tiết
                    </Button>
                 </Link>
               </div>
            )}
            
            {/* Back to list */}
            <div className="mt-8 flex justify-start">
               <Link href="/dich-vu" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group">
                 <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center mr-3 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent transition-all">
                    <ArrowLeft className="w-4 h-4" />
                 </div>
                 Quay lại danh sách Dịch vụ
               </Link>
            </div>
          </article>

          {/* Sticky Sidebar Right */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-28 space-y-6">
               
               {/* Quick Contact Card */}
               <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <PhoneCall className="w-24 h-24" />
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2">Cần tư vấn trực tiếp?</h3>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                     Đội ngũ chuyên gia từ CIC sẵn sàng hỗ trợ bạn bất cứ lúc nào.
                  </p>
                  <Link href={`/lien-he?service=${service.slug}`} className="block w-full">
                    <Button className="w-full rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold h-12 shadow-md hover:scale-[1.02] transition-transform">
                      Yêu cầu gọi lại
                    </Button>
                  </Link>
               </div>

               {/* Table of Contents */}
               {toc.length > 0 && (
                 <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hidden lg:block">
                   <h3 className="text-lg font-bold font-heading mb-4 border-b border-border/50 pb-4">
                     Mục Lục Bài Viết
                   </h3>
                   <TocSidebar toc={toc} />
                 </div>
               )}

            </div>
          </aside>

        </div>
      </main>

    </div>
  );
}
