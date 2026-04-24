import React from 'react';
import Button from './Button';

interface HeroSectionProps {
  onStartAssessment?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartAssessment }) => {
  return (
    <div className="relative bg-brand-darkBlue min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/construction/1920/1080"
          alt="BIM Digital Twin Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darkBlue/90 via-brand-darkBlue/80 to-brand-blue/90"></div>
        {/* Animated grid lines decoration (conceptual) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm animate-fade-in-up">
          <span className="text-blue-200 font-bold uppercase tracking-wider text-xs md:text-sm flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Nền tảng Quản trị số & Pháp lý Xây dựng hàng đầu
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Chinh phục lộ trình <span className="text-brand-orange">BIM 2026</span> <br className="hidden md:block" />
          cùng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">CIC Platform</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          Hệ điều hành số toàn diện giúp Chủ đầu tư & Nhà thầu chuẩn hóa quy trình,
          đảm bảo tuân thủ pháp lý và tối ưu hóa hiệu suất dự án.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" className="w-full md:w-auto font-bold group px-8 py-4 text-lg shadow-lg shadow-blue-500/30" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            Khám phá CIC Platform
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Button>
          <Button variant="outline" size="lg" className="w-full md:w-auto border-white/20 text-white hover:bg-white/10" onClick={onStartAssessment}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Kiểm tra mức độ sẵn sàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;