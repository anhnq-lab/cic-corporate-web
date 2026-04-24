import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_FEATURES } from '../constants';
import Button from './Button';

interface ProductSectionProps {
    onContact?: () => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ onContact }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="py-20 bg-white scroll-mt-20" id="products">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="md:w-1/2">
                        <div className="inline-block bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-3">
                            Đối tác tin cậy số 1
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            Giải pháp <span className="text-brand-blue">Chuyển đổi số</span> <br />
                            & <span className="text-brand-orange">Pháp lý BIM</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Nền tảng tích hợp công cụ tư vấn tự động, giúp doanh nghiệp xây dựng tối ưu hóa quy trình, đảm bảo an toàn pháp lý và gia tăng hiệu suất dự án.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <Button variant="secondary" onClick={onContact}>Tư vấn miễn phí</Button>
                            <Link to="/edt-core" className="inline-flex items-center px-6 py-3 border border-gray-200 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-brand-blue transition-colors">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Tìm hiểu chi tiết
                            </Link>
                            <Button variant="ghost" className="bg-gray-100" onClick={() => setIsVideoPlaying(true)}>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Xem demo
                            </Button>
                        </div>
                        <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500">
                            <span className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Tuân thủ TCVN</span>
                            <span className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Tích hợp Cloud</span>
                            <span className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Hỗ trợ 24/7</span>
                        </div>
                    </div>

                    {/* Product Image Mockup / Video Player */}
                    <div className="md:w-1/2 relative">
                        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative z-10 group cursor-pointer" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                            {isVideoPlaying ? (
                                <div className="aspect-video w-full bg-black flex items-center justify-center">
                                    <p className="text-white text-sm">Video demo đang phát...</p>
                                </div>
                            ) : (
                                <>
                                    <img
                                        src="https://picsum.photos/seed/dashboard_dark/800/500"
                                        alt="CIC Platform Dashboard"
                                        className="w-full opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    {/* Fake Controls */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 space-x-4">
                                        <div className="text-white text-xs">00:45 / 12:20</div>
                                        <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                                            <div className="w-1/3 h-full bg-brand-orange"></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Decorative */}
                        <div className="absolute top-10 right-10 -z-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 left-10 -z-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl"></div>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900">Tính năng mạnh mẽ của CIC Platform</h3>
                    <p className="text-gray-500 text-sm mt-2">Hệ thống quản lý toàn diện giúp kiểm soát mọi khía cạnh của dự án xây dựng từ xa.</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCT_FEATURES.map((feature, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSection;