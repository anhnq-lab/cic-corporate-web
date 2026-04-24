"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react"

interface CandidateApplyFormProps {
  jobId: string
  jobTitle: string
}

export function CandidateApplyForm({ jobId, jobTitle }: CandidateApplyFormProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [applied, setApplied] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  const supabase = createClient()

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      // Nếu đã đăng nhập, kiểm tra xem đã apply job này chưa
      if (session?.user) {
        const { data: candidates } = await supabase
          .from('candidates')
          .select('id, phone')
          .eq('email', session.user.email)
          
        if (candidates && candidates.length > 0) {
          const candidateId = candidates[0].id
          setPhone(candidates[0].phone || "")
          
          const { data: applications } = await supabase
            .from('applications')
            .select('id')
            .eq('candidate_id', candidateId)
            .eq('job_opening_id', jobId)
            
          if (applications && applications.length > 0) {
            setApplied(true)
          }
        }
      }
      setLoading(false)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase, jobId])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${window.location.pathname}`
      }
    })
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !file) return

    setUploading(true)
    try {
      let candidateId = user.id

      // 1. Kiểm tra hoặc tạo candidate record
      const { data: candidates } = await supabase
        .from('candidates')
        .select('id')
        .eq('email', user.email)

      if (!candidates || candidates.length === 0) {
        const { data: newCandidate, error: candidateError } = await supabase
          .from('candidates')
          .insert({
            id: user.id, // dùng auth trigger hoặc manual match
            email: user.email,
            full_name: user.user_metadata.full_name || 'Ứng viên',
            phone: phone,
          })
          .select()
          .single()
        
        if (candidateError) throw candidateError
        candidateId = newCandidate.id
      } else {
        candidateId = candidates[0].id
        // Cập nhật SĐT nếu có
        if (phone) {
           await supabase.from('candidates').update({ phone }).eq('id', candidateId)
        }
      }

      // 2. Upload CV file
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}_${Date.now()}.${fileExt}`
      const filePath = `resumes/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(filePath)

      // Cập nhật link CV mới nhất cho candidate
      await supabase.from('candidates').update({ resume_url: urlData.publicUrl }).eq('id', candidateId)

      // 3. Tạo Application record
      const { error: appError } = await supabase
        .from('applications')
        .insert({
          candidate_id: candidateId,
          job_opening_id: jobId,
          stage: 'Mới ứng tuyển',
          notes: notes
        })

      if (appError) throw appError

      setApplied(true)
    } catch (error) {
      console.error('Lỗi khi nộp CV:', error)
      alert("Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại sau.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center animate-pulse text-muted-foreground">Đang tải...</div>
  }

  if (applied) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Đã nộp thành công!</h3>
        <p className="text-green-600 dark:text-green-500">Cảm ơn bạn đã ứng tuyển vào vị trí {jobTitle}. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold mb-4">Nộp hồ sơ ngay</h3>
        <p className="text-muted-foreground mb-6">Đăng nhập nhanh bằng tài khoản Google để nộp CV và theo dõi trạng thái ứng tuyển.</p>
        <Button onClick={handleGoogleLogin} size="lg" className="w-full sm:w-auto rounded-full bg-white text-black border border-gray-200 hover:bg-gray-50 flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path><path fill="none" d="M1 1h22v22H1z"></path></svg>
          Đăng nhập bằng Google
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="mb-6 flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border/40">
        <div>
          <p className="text-sm text-muted-foreground">Đang ứng tuyển dưới tên:</p>
          <p className="font-semibold">{user.user_metadata.full_name || user.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>Đăng xuất</Button>
      </div>

      <form onSubmit={handleApply} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại liên hệ *</Label>
          <Input 
            id="phone" 
            required 
            placeholder="0912 345 678" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Tải lên CV (PDF) *</Label>
          <div className="relative">
            <Input 
              id="cv" 
              type="file" 
              accept=".pdf" 
              required 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="cursor-pointer file:bg-accent/10 file:text-accent file:border-0 file:mr-4 file:py-1 file:px-3 file:rounded-full hover:file:bg-accent/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Lời nhắn (Tùy chọn)</Label>
          <Textarea 
            id="notes" 
            placeholder="Giới thiệu bản thân hoặc lý do bạn phù hợp với vị trí này..." 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button 
          type="submit" 
          disabled={uploading || !file} 
          className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang Gửi Hồ Sơ...
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4 mr-2" />
              Nộp CV Ứng Tuyển
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
