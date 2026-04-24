import React, { useEffect, useState } from 'react';
import Button from './Button';
import { api } from '../services/api';

interface LibrarySectionProps {
    onContact?: () => void;
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ onContact }) => {
    const [libItems, setLibItems] = useState<any[]>([]);
    const [email, setEmail] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Mappings for category display
    const categories = [
        { id: 'all', label: 'Tất cả' },
        { id: 'legal', label: 'Giải mã Pháp lý' },
        { id: 'technical', label: 'Kỹ thuật thực chiến' },
        { id: 'resource', label: 'Tài liệu & Ebook' }
    ];

    useEffect(() => {
        api.getLibrary().then(setLibItems).catch(console.error);
    }, []);

    const handleSubscribe = async () => {
        if (!email) return alert('Vui lòng nhập email');
        try {
            await api.subscribeNewsletter(email);
            alert('Đăng ký thành công!');
            setEmail('');
        } catch (error: any) {
            alert(error.message);
        }
    };

    const getItems = (type: string) => libItems.filter(i => i.type === type);
    const featured = getItems('featured')[0];
    const infographics = getItems('infographic');

    // Filter main content items (excluding featured and infographic unless we want them in "all" list? 
    // Usually sectioned separately. Let's treat the bottom grid as the "General Library".)
    const mainItems = libItems.filter(i => {
        if (i.type === 'featured' || i.type === 'infographic') return false; // Keep top section separate
        if (activeCategory === 'all') return true;
        return i.type === activeCategory;
    });

    const categoryTitle = categories.find(c => c.id === activeCategory)?.label || 'Tài liệu';
    // If no featured item from API, fallback to a placeholder/hidden or handle gracefully.
    // For now, let's assume if database is empty we show nothing or skeleton.

    return (
        <div className="py-20 bg-white scroll-mt-20" id="library">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Header & Description */}
                    <div className="lg:w-1/3">
                        <span className="text-brand-blue font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Cập nhật mới 2024
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                            Thư viện <span className="text-brand-blue">Pháp lý & Kiến thức</span> <br />
                            Chuyển đổi số Xây dựng
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Cổng thông tin số 1 Việt Nam về pháp lý BIM. Truy cập hàng trăm bài viết phân tích chuyên sâu, hướng dẫn kỹ thuật thực chiến và kho tài liệu mẫu chuẩn hóa.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="secondary" size="md">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Tải tài liệu mẫu
                            </Button>
                            <Button variant="outline" size="md" onClick={onContact}>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                Tư vấn tự động
                            </Button>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <span
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-3 py-1 text-xs rounded-full cursor-pointer flex items-center transition-colors ${activeCategory === cat.id
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Featured Cards Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Main Featured Item - Dynamic */}
                        {featured ? (
                            <div className="md:col-span-2 relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer" onClick={() => featured.link && window.open(featured.link, '_blank')}>
                                <img src={featured.image_url || "https://picsum.photos/seed/construction4/800/400"} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-lg">
                                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Nổi bật</span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{featured.title}</h3>
                                    <p className="text-blue-100 text-sm line-clamp-2">{featured.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="md:col-span-2 relative h-[250px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400">Chưa có bài nổi bật</span>
                            </div>
                        )}

                        {/* Sub Items - Dynamic Infographics */}
                        {infographics.slice(0, 1).map(item => (
                            <div key={item.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => item.link && window.open(item.link, '_blank')}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-blue-50 text-brand-blue text-[10px] font-bold px-2 py-1 rounded">{item.tag || 'Infographic'}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2 hover:text-brand-blue transition-colors line-clamp-2">{item.title}</h4>
                                <p className="text-xs text-gray-500 mb-4">{new Date(item.created_at).toLocaleDateString('vi-VN')}</p>
                            </div>
                        ))}

                        {infographics.length === 0 && (
                            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-center text-gray-400 text-sm">Chưa có infographic</div>
                        )}


                        {/* Newsletter Box */}
                        <div className="bg-brand-darkBlue p-5 rounded-2xl shadow-sm text-white relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue rounded-full blur-2xl -mr-10 -mt-10 opacity-50"></div>
                            <div className="relative z-10">
                                <svg className="w-8 h-8 text-brand-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <h4 className="font-bold text-lg mb-2">Nhận tin pháp lý tuần</h4>
                                <p className="text-xs text-gray-300 mb-4">Cập nhật thay đổi mới nhất về luật xây dựng vào thứ 2 hàng tuần.</p>
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Email của bạn"
                                        className="bg-white/10 border-none text-white text-xs px-3 py-2 rounded-l-md w-full focus:outline-none placeholder-gray-400"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <button onClick={handleSubscribe} className="bg-brand-orange text-white text-xs font-bold px-3 rounded-r-md hover:bg-orange-600">Gửi</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Filtered Items Section */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-3 text-brand-blue">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{categoryTitle}</h3>
                                <p className="text-xs text-gray-500">Danh sách tài liệu được cập nhật mới nhất.</p>
                            </div>
                        </div>
                        {/* 
                        <a href="#" className="text-sm font-semibold text-brand-blue hover:underline flex items-center">
                            Xem tất cả
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                        */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {mainItems.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer" onClick={() => item.link && window.open(item.link, '_blank')}>
                                <div className="h-40 relative">
                                    <img src={item.image_url || "https://picsum.photos/seed/tech1/400/300"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">{item.tag || item.type}</span>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-brand-blue">{item.title}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                                        <div className="h-full bg-brand-blue w-0 group-hover:w-full transition-all duration-700"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {mainItems.length === 0 && (
                            <div className="col-span-4 text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
                                Không tìm thấy tài liệu nào trong mục này.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LibrarySection;