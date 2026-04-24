import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../constants'; // Fallback if API fails, or remove
import { api } from '../services/api';
import { NewsItem } from '../types';

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getNews()
      .then(data => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Không thể tải tin tức.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-20 bg-white scroll-mt-20" id="news">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-red-500 font-bold uppercase text-xs tracking-wider mb-2 block">Tin nóng pháp lý</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Cập nhật chính sách mới nhất
            </h2>
          </div>
          <a href="#" className="text-brand-blue font-semibold hover:text-blue-800 flex items-center mt-4 md:mt-0 transition-colors">
            Xem tất cả tin tức
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Featured Article - Takes up left side on desktop */}
          <div className="md:col-span-7 lg:col-span-6 relative group overflow-hidden rounded-2xl shadow-md h-[400px] md:h-auto">
            <img
              src="https://picsum.photos/seed/construction2/800/600"
              alt="Featured News"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-semibold mb-3 inline-block">Nghị định</span>
              <h3 className="text-2xl font-bold text-white mb-3 hover:text-brand-orange transition-colors cursor-pointer">
                Chính thức ban hành lộ trình áp dụng BIM trong hoạt động xây dựng đến năm 2030
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                Thủ tướng Chính phủ vừa phê duyệt Quyết định quy định lộ trình áp dụng Mô hình thông tin công trình (BIM) trong hoạt động xây dựng...
              </p>
              <div className="flex items-center text-gray-400 text-xs">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                12/10/2023
              </div>
            </div>
          </div>

          {/* Side List */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col space-y-6">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Đang tải tin tức...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              newsItems.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer border border-transparent hover:border-gray-200">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block ${item.category === 'Thông tư' ? 'bg-green-100 text-green-700' :
                      item.category === 'Xu hướng' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                      {item.category}
                    </span>
                    <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h4>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;