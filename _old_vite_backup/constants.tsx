import React from 'react';
import { NavItem, NewsItem, RoleCard, Testimonial, ProductFeature, PricingPlan, ServiceItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Thư viện', href: '/#library' },
  { label: 'Công cụ', href: '#tools' },
  { label: 'Giải pháp & Bảng giá', href: '#products' },
  { label: 'Tin tức', href: '#news' },
  { label: 'Liên hệ', href: '#contact' },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: 'Pháp lý mới',
    title: 'Nghị định 175/2024/NĐ-CP: Quy định chi tiết và biện pháp thi hành Luật Xây dựng',
    date: '30/12/2024',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    excerpt: 'Cập nhật quan trọng về phân loại dự án, thẩm định Báo cáo NCTKT và lộ trình áp dụng BIM.'
  },
  {
    id: 2,
    category: 'Nghị định',
    title: 'Nghị định 111/2024/NĐ-CP: Quy định về Hợp đồng xây dựng và Quản lý chi phí',
    date: '30/12/2024',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    excerpt: 'Hướng dẫn mới về hợp đồng FIDIC, điều chỉnh giá và quản lý định mức xây dựng.'
  },
  {
    id: 3,
    category: 'Xu hướng',
    title: 'Digital Twin: Bước tiến mới trong quản lý vận hành tòa nhà thông minh',
    date: '28/08/2024',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    excerpt: 'Ứng dụng Digital Twin giúp tối ưu hóa năng lượng và chi phí vận hành.'
  }
];

export const ROLE_CARDS: RoleCard[] = [
  {
    id: 'state_pmu',
    title: 'Ban QLDA (PMU) Vốn Ngân sách',
    description: 'Rủi ro pháp lý cao. Áp lực báo cáo số liệu chuẩn NĐ 111/2024 lên Cổng Dữ liệu Quốc gia.',
    features: [
      'Cổng Kết nối Quốc gia (National Data Gateway)',
      'Quản lý Đầu tư công & Kho bạc (03a/04a)',
      'Quản lý Pháp lý & Đấu thầu (Luật 2023)',
      'Văn phòng số & Ký số CA'
    ],
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    ctaText: 'Giải pháp Tuân thủ (Compliance)'
  },
  {
    id: 'owner',
    title: 'Chủ đầu tư Bất động sản',
    description: 'Áp lực dòng tiền cực lớn. Cần quản lý đồng bộ từ Pháp lý -> Thi công -> Bán hàng.',
    features: [
      'Quản trị Dòng tiền (Cashflow Master)',
      'Quản lý Phát triển Dự án & Pháp lý',
      'Cổng thông tin Cư dân/Khách hàng',
      'Quản lý Hợp đồng & Chi phí (Budget)'
    ],
    icon: (
      <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    ctaText: 'Giải pháp Hiệu quả (Efficiency)'
  },
  {
    id: 'consultant',
    title: 'Đơn vị Tư vấn (TK/GS/QLDA)',
    description: 'Yêu cầu thiết kế/thẩm tra trên nền tảng BIM (NĐ 175). Tối ưu hóa chi phí nhân sự.',
    features: [
      'Môi trường CDE Hub & Quy trình duyệt',
      'BIM Reviewer Web-based (NĐ 175)',
      'Quản lý Timesheet & Chi phí nội bộ',
      'Thư viện Tiêu chuẩn số (AI Base)'
    ],
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    ctaText: 'Giải pháp Năng suất (Productivity)'
  },
  {
    id: 'contractor',
    title: 'Nhà thầu Thi công',
    description: 'Thất thoát vật tư, thiết bị tại công trường. Khó kiểm soát năng suất nhân công.',
    features: [
      'Nhật ký thi công điện tử (E-Site Diary)',
      'Quản lý An toàn & Sự cố (HSE)',
      'Quản lý Kho & Vật tư hiện trường',
      'Quản lý Thầu phụ & Tổ đội'
    ],
    icon: (
      <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    ctaText: 'Giải pháp Kiểm soát (Control)'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "CIC Platform đã giúp chúng tôi giảm 30% thời gian họp giao ban hàng tuần và loại bỏ hoàn toàn việc thất lạc hồ sơ công trình.",
    author: "Nguyễn Văn A",
    role: "Giám đốc dự án",
    company: "Vinaconex",
    avatar: "https://i.pravatar.cc/150?u=1",
    stars: 5
  },
  {
    id: 2,
    quote: "Sự an tâm về pháp lý là lý do chúng tôi chọn CIC. Các mẫu biểu báo cáo hoàn toàn tự động và chuẩn xác theo quy định nhà nước.",
    author: "Lê Thị B",
    role: "Trưởng phòng BIM",
    company: "Cotecons",
    avatar: "https://i.pravatar.cc/150?u=2",
    stars: 5
  },
  {
    id: 3,
    quote: "Khả năng tích hợp mô hình 3D trực tiếp trên web của CIC-CDE rất ấn tượng, giúp chủ đầu tư dễ dàng hình dung mà không cần cài phần mềm nặng.",
    author: "Trần Văn C",
    role: "CEO",
    company: "ABC Construction",
    avatar: "https://i.pravatar.cc/150?u=3",
    stars: 5
  }
];

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    title: "Quản lý tiến độ",
    description: "Theo dõi Gantt Chart thời gian thực, cảnh báo trễ hạn tự động qua Email/SMS.",
    icon: (
      <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  {
    title: "Kiểm soát chi phí",
    description: "Giám sát dòng tiền dự án, quản lý hợp đồng và phát sinh chi phí chặt chẽ.",
    icon: (
      <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  {
    title: "Tích hợp BIM 3D",
    description: "Xem trực tiếp mô hình IFC trên trình duyệt, gắn kết dữ liệu dự án vào mô hình.",
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
    )
  },
  {
    title: "Báo cáo tự động",
    description: "Xuất báo cáo định kỳ theo mẫu chuẩn hóa của Bộ Xây Dựng chỉ với 1 click.",
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    )
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'startup',
    name: 'Basic (Cá nhân)',
    price: '0đ',
    period: '/tháng',
    description: 'Dành cho sinh viên và người mới bắt đầu tìm hiểu BIM.',
    features: ['Truy cập kho thư viện miễn phí', 'Đọc tin tức & pháp lý', 'Tham gia cộng đồng cơ bản', '1 Dự án cá nhân'],
    ctaText: 'Đăng ký miễn phí',
    type: 'software'
  },
  {
    id: 'business',
    name: 'Pro (Doanh nghiệp)',
    price: '2.500.000đ',
    period: '/tháng',
    description: 'Dành cho các doanh nghiệp tư vấn thiết kế vừa và nhỏ.',
    features: ['Tất cả tính năng Basic', '5 Licenses Add-on CIC Tools', 'Hỗ trợ kỹ thuật 24/7', 'Tư vấn triển khai ban đầu'],
    isPopular: true,
    ctaText: 'Liên hệ tư vấn',
    type: 'software'
  },
  {
    id: 'enterprise',
    name: 'Enterprise (Tập đoàn)',
    price: 'Liên hệ',
    description: 'Giải pháp toàn diện cho các tổng công ty và tập đoàn.',
    features: ['Tùy biến bộ công cụ theo nhu cầu', 'Đào tạo nội bộ (In-house)', 'Tư vấn chiến lược chuyển đổi số', 'Server lưu trữ riêng'],
    ctaText: 'Gặp chuyên gia',
    type: 'software'
  },
  {
    id: 'legal-service',
    name: 'Tư vấn An toàn Pháp lý BIM',
    price: 'Gói cơ bản',
    description: 'Đảm bảo hồ sơ BIM tuân thủ các quy chuẩn, tiêu chuẩn Việt Nam (TCVN) mới nhất.',
    features: ['Rà soát rủi ro pháp lý hợp đồng BIM', 'Tư vấn lập EIR/BEP chuẩn ISO 19650', 'Hỗ trợ giải trình với cơ quan thẩm định', 'Đào tạo nhận thức pháp lý cho nhân sự'],
    ctaText: 'Nhận tư vấn ngay',
    type: 'service'
  },
  {
    id: 'performance-service',
    name: 'Tối ưu Hiệu suất Dự án',
    price: 'Gói nâng cao',
    description: 'Phân tích quy trình hiện tại, đề xuất lộ trình chuyển đổi số phù hợp.',
    features: ['Đánh giá năng lực số (Digital Maturity Audit)', 'Xây dựng quy trình phối hợp CDE', 'Thiết lập Dashboard báo cáo tự động', 'Đào tạo sử dụng thành thạo bộ công cụ CIC Platform'],
    ctaText: 'Nhận tư vấn ngay',
    type: 'service'
  }
];
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'bim-consulting',
    title: 'Tư vấn BIM',
    description: 'Dịch vụ tư vấn toàn diện từ lập mô hình, quản lý dự án đến thẩm tra BIM, đảm bảo tuân thủ tiêu chuẩn và hiệu quả đầu tư.',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    features: ['Tư vấn lập mô hình BIM (3D-7D)', 'Tư vấn quản lý dự án BIM', 'Tư vấn thẩm tra mô hình BIM'],
    ctaText: 'Xem chi tiết'
  },
  {
    id: 'bim-training',
    title: 'Đào tạo & Tiêu chuẩn BIM',
    description: 'Hỗ trợ doanh nghiệp xây dựng bộ tiêu chuẩn BIM riêng và đào tạo nhân sự để làm chủ quy trình làm việc số.',
    icon: (
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: ['Xây dựng bộ tiêu chuẩn BIM doanh nghiệp', 'Đào tạo phần mềm & quy trình BIM', 'Đánh giá năng lực nhân sự'],
    ctaText: 'Đăng ký đào tạo'
  },
  {
    id: 'digital-platform',
    title: 'Nền tảng Quản trị số & CDE',
    description: 'Cung cấp nền tảng CDE (Common Data Environment) giúp quản lý, lưu trữ và chia sẻ dữ liệu dự án tập trung, an toàn.',
    icon: (
      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    features: ['Nền tảng CDE chuẩn ISO 19650', 'Quản lý tài liệu & quy trình phê duyệt', 'Tích hợp mô hình BIM trên web'],
    ctaText: 'Trải nghiệm ngay'
  }
];
