import React, { useEffect, useState } from 'react';
import Button from './Button';
import { api } from '../services/api';

interface ToolsSectionProps {
  onStartAssessment?: () => void;
  onAskAI?: (question: string) => void;
  onDownloadToolkit?: () => void;
}

// ... SVG COMPONENTS (DEPLOY-SAFE) ...
// (Keeping existing SVGs)

// 1. CIC LOGO - MODERN TECH STYLE
// Clean typography with a digital node accent
export const CICLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 140 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Geometric Abstract Symbol */}
    <path d="M20 15 L10 30 L20 45" stroke="#004488" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M120 15 L130 30 L120 45" stroke="#004488" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

    {/* Text CIC */}
    <text x="70" y="42" textAnchor="middle" fill="#004488" fontSize="32" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-1">CIC</text>

    {/* Digital Dot (The "Twin" aspect) */}
    <circle cx="108" cy="18" r="4" fill="#FF6B00">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Underline Tech Line */}
    <rect x="35" y="52" width="70" height="3" rx="1.5" fill="#E5E7EB" />
    <rect x="35" y="52" width="20" height="3" rx="1.5" fill="#FF6B00">
      <animate attributeName="x" values="35;85;35" dur="4s" repeatCount="indefinite" />
    </rect>
  </svg>
);

// 2. ROBOT AVATAR - MODERN GLASSMORPHISM AI
// Floating head, glowing eyes, sleek design
export const RobotAvatar: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
      <linearGradient id="robotFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer Floating Ring (Halo) */}
    <circle cx="100" cy="100" r="90" stroke="#E0F2FE" strokeWidth="1" fill="none" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
    </circle>
    <path d="M100 10 A90 90 0 0 1 190 100" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="3s" repeatCount="indefinite" />
    </path>

    {/* Main Head Shape (Squircle) */}
    <rect x="40" y="40" width="120" height="120" rx="35" fill="url(#robotBodyGrad)" stroke="white" strokeWidth="2" />

    {/* Face Screen (Black Glass) */}
    <rect x="55" y="65" width="90" height="70" rx="15" fill="url(#robotFaceGrad)" stroke="#374151" strokeWidth="1" />

    {/* Eyes - Glowing Digital Pills */}
    <g filter="url(#glowBlue)">
      {/* Left Eye */}
      <ellipse cx="80" cy="95" rx="10" ry="14" fill="#60A5FA" opacity="0.9">
        <animate attributeName="ry" values="14;2;14" dur="3s" repeatCount="indefinite" begin="0s" />
      </ellipse>
      {/* Right Eye */}
      <ellipse cx="120" cy="95" rx="10" ry="14" fill="#60A5FA" opacity="0.9">
        <animate attributeName="ry" values="14;2;14" dur="3s" repeatCount="indefinite" begin="0.2s" />
      </ellipse>
    </g>

    {/* Digital Mouth / Audio Visualizer */}
    <g transform="translate(100, 118)">
      <rect x="-12" y="0" width="3" height="3" rx="1" fill="#3B82F6">
        <animate attributeName="height" values="3;10;3" dur="1s" repeatCount="indefinite" />
        <animate attributeName="y" values="0;-3.5;0" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="-4" y="0" width="3" height="6" rx="1" fill="#3B82F6">
        <animate attributeName="height" values="6;14;6" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="y" values="0;-4;0" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="4" y="0" width="3" height="6" rx="1" fill="#3B82F6">
        <animate attributeName="height" values="6;14;6" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="y" values="0;-4;0" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="12" y="0" width="3" height="3" rx="1" fill="#3B82F6">
        <animate attributeName="height" values="3;10;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="y" values="0;-3.5;0" dur="0.9s" repeatCount="indefinite" />
      </rect>
    </g>

    {/* Reflections (Glossy look) */}
    <path d="M50 50 Q100 45 150 50" stroke="white" strokeWidth="2" strokeOpacity="0.5" fill="none" />
  </svg>
);

const ToolsSection: React.FC<ToolsSectionProps> = ({ onStartAssessment, onAskAI, onDownloadToolkit }) => {
  const [query, setQuery] = useState('');
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    api.getTools().then(data => setTools(data));
  }, []);

  const handleAsk = () => {
    if (onAskAI) {
      onAskAI("Tôi muốn tìm hiểu về pháp lý dự án.");
    }
  };

  return (
    <div className="py-20 bg-gray-50 scroll-mt-20" id="tools">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bộ công cụ chuyên sâu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Giải pháp công nghệ giúp tối ưu hóa quy trình pháp lý và kỹ thuật.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* AI Legal Assistant Card - CARD LAYOUT */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            {/* Ambient Background Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10 flex-1 md:pr-6 text-center md:text-left">
              {/* CIC Logo Area - Modern */}
              <div className="mb-4 h-12 w-32 mx-auto md:mx-0">
                <CICLogo />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Trợ lý Pháp lý AI
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Sử dụng công cụ Tư vấn tự động của CIC để nhận lộ trình pháp lý được cá nhân hóa cho dự án cụ thể của bạn chỉ trong 30 giây.
              </p>
              <Button
                variant="primary"
                size="md"
                className="font-semibold shadow-lg shadow-orange-200 w-full md:w-auto rounded-full"
                onClick={handleAsk}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                Trải nghiệm Tư vấn AI
              </Button>
            </div>

            <div className="relative z-10 mt-8 md:mt-0 w-40 h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Robot Avatar SVG with Float Animation - Modern */}
                <div className="w-full h-full drop-shadow-2xl animate-float">
                  <RobotAvatar />
                </div>

                {/* Online Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/50 flex items-center z-20">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maturity Assessment Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-lg border border-blue-100 flex flex-col hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4 text-brand-blue shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Đánh giá năng lực BIM</h3>
                <p className="text-sm text-gray-500">Maturity Assessment Tool</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-600">Điểm trung bình ngành</span>
                <span className="text-2xl font-bold text-brand-blue">3.5<span className="text-sm text-gray-400 font-normal">/5</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
              Doanh nghiệp của bạn đang ở đâu trên bản đồ chuyển đổi số? Làm bài trắc nghiệm nhanh 5 phút để nhận báo cáo chi tiết và lộ trình đề xuất.
            </p>

            <Button variant="outline" className="w-full justify-center rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" onClick={onStartAssessment}>
              Bắt đầu đánh giá
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Button>
          </div>

          {/* Download Toolkit Card */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 shadow-lg border border-orange-100 flex flex-col hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4 text-orange-600 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Toolkit Chuyển đổi số</h3>
                <p className="text-sm text-gray-500">Resource Library</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
              Tải xuống bộ tài liệu hướng dẫn, biểu mẫu và quy trình mẫu để bắt đầu hành trình áp dụng BIM ngay hôm nay. Bao gồm BEP, CDE Guidelines.
            </p>

            <Button
              variant="primary"
              className="w-full justify-center rounded-full bg-orange-500 hover:bg-orange-600 border-none shadow-orange-200 shadow-lg"
              onClick={onDownloadToolkit}
            >
              Tải bộ công cụ
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </Button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ToolsSection;