import { getJobOpenings } from '@/lib/data'
import { Building2, MapPin, Briefcase, Clock, CalendarDays, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// ISR: Revalidate recruitment every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: 'Tuyển dụng | CIC Nơi hội tụ nhân tài',
  description: 'Khám phá cơ hội nghề nghiệp tại CIC. Tham gia cùng chúng tôi để xây dựng những sản phẩm công nghệ xuất sắc.',
}

export default async function RecruitmentPage() {
  const jobs = await getJobOpenings()

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="container relative max-w-screen-xl mx-auto px-4 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Cơ hội nghề nghiệp</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-6 text-foreground">
            Cùng CIC kiến tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Tương lai</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Môi trường làm việc chuyên nghiệp, năng động với nhiều cơ hội thăng tiến và phát triển bản thân.
          </p>
        </div>
      </section>

      {/* JobList Section */}
      <section className="py-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-4 text-foreground">Vị trí đang tuyển</h2>
              <p className="text-muted-foreground">Chúng tôi đang tìm kiếm đồng đội ở các vị trí sau</p>
            </div>
            {/* Có thể thêm bộ lọc (filter) sau */}
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border/50">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Hiện chưa có vị trí nào đang mở</h3>
              <p className="text-muted-foreground">Vui lòng quay lại sau để cập nhật cơ hội mới nhất.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="group flex flex-col bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                        {job.department || 'Phòng ban'}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground opacity-60">
                        Hạn: {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : 'Liên hệ'}
                      </span>
                    </div>
                    
                    <Link href={`/tuyen-dung/${job.slug}`}>
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {job.title}
                      </h3>
                    </Link>
                    
                    <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location || 'Toàn quốc'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience_level || 'Không yêu cầu kinh nghiệm'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.job_type || 'Toàn thời gian'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 mt-auto">
                    <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                      <div className="font-semibold text-foreground">
                        {job.salary_range_min && job.salary_range_max 
                          ? `${(job.salary_range_min / 1000000).toLocaleString()} - ${(job.salary_range_max / 1000000).toLocaleString()} Tr` 
                          : 'Thỏa thuận'
                        }
                      </div>
                      <Link href={`/tuyen-dung/${job.slug}`}>
                        <Button variant="ghost" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground rounded-full flex items-center gap-1.5 transition-colors">
                          Chi tiết
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
