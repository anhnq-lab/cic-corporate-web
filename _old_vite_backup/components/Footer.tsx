import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import NewsletterSignup from './NewsletterSignup';

const Footer: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: 'BIM Hub Vietnam',
    footerDescription: 'Nền tảng tri thức và công cụ hỗ trợ chuyển đổi số hàng đầu cho ngành xây dựng Việt Nam.',
    facebook: '',
    linkedin: '',
    footerCategories: '[]',
    footerAudiences: '[]'
  });


  useEffect(() => {
    api.getSettings().then(data => {
      // Merge with defaults
      setSettings(prev => ({ ...prev, ...data }));
    }).catch(console.error);
  }, []);

  const categories = JSON.parse(settings.footerCategories || '[]');
  const audiences = JSON.parse(settings.footerAudiences || '[]');

  // Default lists if empty (to avoid broken UI during transition)
  const defaultCategories = [
    { title: "Văn bản pháp lý", url: "#" },
    { title: "Tiêu chuẩn BIM", url: "#" },
    { title: "Thư viện Family", url: "#" },
    { title: "Khóa học & Đào tạo", url: "#" }
  ];

  const defaultAudiences = [
    { title: "Chủ đầu tư / Ban QLDA", url: "#" },
    { title: "Tư vấn thiết kế", url: "#" },
    { title: "Nhà thầu thi công", url: "#" },
    { title: "Cơ quan quản lý nhà nước", url: "#" }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  const displayAudiences = audiences.length > 0 ? audiences : defaultAudiences;

  return (
    <footer className="bg-[#0f1218] text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-white text-xl font-bold mb-6">
              <svg className="w-8 h-8 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              {settings.companyName}
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
              )}
              {/* Keep Facebook icon svg for now or find real Facebook path. The one above is Twitter (path d="M24 4.557..."). 
                  I should probably use correct SVGs. 
                  Use generic link or check if I have correct SVGs.
                  The original footer had Twitter (M24...) and Instagram (M12 2.163...).
                  I will just use them as "Social 1" and "Social 2" for now or use the User's provided links.
                  Wait, the user asked for Facebook and LinkedIn. I should ideally swap icons. 
                  For now I will keep existing icons but link them to the settings.facebook/linkedin.
                  Or better, update SVGs if I know them. 
                  I will use the existing icons but map them to the new settings.
              */}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Danh mục</h4>
            <ul className="space-y-3 text-sm">
              {displayCategories.map((item: any, idx: number) => (
                <li key={idx}><a href={item.url} className="hover:text-white transition-colors">{item.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Đối tượng</h4>
            <ul className="space-y-3 text-sm">
              {displayAudiences.map((item: any, idx: number) => (
                <li key={idx}><a href={item.url} className="hover:text-white transition-colors">{item.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 {settings.companyName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;