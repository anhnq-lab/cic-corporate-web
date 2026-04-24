"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AdBanner() {
  const adUrl = "https://netzero2050.vn/lca-va-epd-ho-chieu-xanh-cho-doanh-nghiep-phat-trien-ben-vung/";

  return (
    <>
      <div className="hidden min-[1600px]:flex fixed top-[120px] left-6 2xl:left-10 w-[160px] 2xl:w-[180px] h-auto min-h-[250px] pb-4 z-40 bg-[#0A1628]/80 backdrop-blur-2xl rounded-2xl border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] items-center justify-center transition-all group">
        <Link href="/dich-vu/tu-van-bim" className="w-full h-full flex flex-col p-4 relative">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] transition-colors" />
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-auto">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4 shadow-inner">
                <span className="text-accent font-black text-sm tracking-tight">BIM</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white leading-tight mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                Tư vấn BIM
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Dịch vụ BIM chuyên nghiệp cho chủ đầu tư.
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-center w-full bg-accent hover:bg-accent/90 py-2 rounded-xl text-accent-foreground text-xs font-bold shadow-lg shadow-accent/20 group-hover:-translate-y-1 transition-transform duration-300">
              Chi tiết
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </Link>
      </div>

      {/* Right Banner */}
      <div className="hidden min-[1600px]:flex fixed top-[120px] right-6 2xl:right-10 w-[160px] 2xl:w-[180px] h-auto min-h-[250px] pb-4 z-40 bg-[#0A1628]/80 backdrop-blur-2xl rounded-2xl border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] items-center justify-center transition-all group">
        <Link href={adUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-col p-4 relative">
          {/* Decorative glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] transition-colors" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-auto">
               <div className="w-full h-20 relative rounded-xl border border-accent/10 flex items-center justify-center mb-4 overflow-hidden shadow-inner bg-black/20">
                 <img src="/netzero-banner.jpg" alt="NetZero 2050" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white leading-tight mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                NetZero
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                LCA và EPD – Hộ chiếu cho phát triển xanh.
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-center w-full bg-accent hover:bg-accent/90 py-2 rounded-xl text-accent-foreground text-xs font-bold shadow-lg shadow-accent/20 group-hover:-translate-y-1 transition-transform duration-300">
              Xem ngay
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
