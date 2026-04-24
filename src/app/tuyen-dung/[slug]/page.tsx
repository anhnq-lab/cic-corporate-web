import { getJobOpeningBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Briefcase, Clock, CalendarDays, DollarSign } from 'lucide-react'
import { CandidateApplyForm } from '@/components/recruitment/CandidateApplyForm'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug);
  if (!job) return { title: 'Not Found' }

  return {
    title: `${job.title} | CIC Tuyển Dụng`,
    description: job.seo_description || `Tin tuyển dụng ${job.title} tại CIC. Nộp CV ngay.`,
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug)

  if (!job) {
    return notFound()
  }

  // Fallback to text rendering if no rich text component is needed for now
  // Assumes description, requirements, benefits are plain text or html. 
  // We will use dangerouslySetInnerHTML to support basic HTML if exported from a rich text editor in CIC-ERP

  return (
    <>
      <section className="bg-muted/20 border-b border-border/50 py-12 lg:py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <Link href="/tuyen-dung" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách viêc làm</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="lg:max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-semibold text-accent mb-4">
                {job.department || 'Phòng ban'}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{job.location || 'Toàn quốc'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <span>{job.experience_level || 'Không yêu cầu kinh nghiệm'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{job.job_type || 'Toàn thời gian'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">
                    {job.salary_range_min && job.salary_range_max 
                      ? `${(job.salary_range_min / 1000000).toLocaleString()} - ${(job.salary_range_max / 1000000).toLocaleString()} Triệu VNĐ` 
                      : 'Lương thỏa thuận'
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block text-right">
              <div className="text-sm text-muted-foreground mb-2">Hạn nộp hồ sơ</div>
              <div className="text-xl font-semibold flex items-center justify-end gap-2 text-foreground">
                <CalendarDays className="w-5 h-5 text-accent" />
                {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'Liên hệ'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 font-heading border-b border-border/50 pb-4">Mô tả công việc</h2>
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.description?.replace(/\n/g, '<br/>') || 'Đang cập nhật...' }}
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 font-heading border-b border-border/50 pb-4">Yêu cầu ứng viên</h2>
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.requirements?.replace(/\n/g, '<br/>') || 'Đang cập nhật...' }}
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 font-heading border-b border-border/50 pb-4">Quyền lợi</h2>
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.benefits?.replace(/\n/g, '<br/>') || 'Đang cập nhật...' }}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <CandidateApplyForm jobId={job.id} jobTitle={job.title} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
