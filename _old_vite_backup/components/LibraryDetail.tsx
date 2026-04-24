import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { api } from '../services/api';

const LibraryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            api.getLibraryDetail(id).then(data => {
                setItem(data);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải tài liệu...</div>;
    if (!item) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy tài liệu.</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">

                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-6">
                        <Link to="/" className="hover:text-brand-blue">Trang chủ</Link> /
                        <span className="mx-2">Thư viện</span> /
                        <span className="text-gray-800 ml-2 font-medium truncate">{item.title}</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {item.type}
                                </span>
                                <span className="text-gray-400 text-sm">{item.created_at}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                        {item.author?.[0]}
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-bold text-gray-900">{item.author}</div>
                                        <div className="text-xs text-gray-500">Author</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Image */}
                        <div className="w-full h-80 md:h-96 relative">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content || item.description }}></div>

                                {/* Attachments */}
                                {item.attachments && (
                                    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            Tài liệu đính kèm
                                        </h3>
                                        <div className="space-y-3">
                                            {item.attachments.map((file: any, idx: number) => (
                                                <a key={idx} href={file.url} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-blue hover:shadow-sm transition-all group">
                                                    <div className="flex items-center overflow-hidden">
                                                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500 font-bold uppercase shrink-0">
                                                            {file.type}
                                                        </div>
                                                        <div className="ml-3 truncate">
                                                            <div className="font-medium text-gray-900 truncate group-hover:text-brand-blue transition-colors">{file.name}</div>
                                                            <div className="text-xs text-gray-400">{file.size}</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-brand-blue text-sm font-medium whitespace-nowrap px-3 py-1 bg-blue-50 rounded group-hover:bg-blue-100 transition-colors">Tải về</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar / Related */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">Tài liệu liên quan</h3>
                                    <div className="space-y-4">
                                        {item.related?.map((rel: any) => (
                                            <Link to={`/library/${rel.id}`} key={rel.id} className="block group">
                                                <div className="text-sm font-medium text-gray-800 group-hover:text-brand-blue transition-colors mb-1">
                                                    {rel.title}
                                                </div>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{rel.type}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-6 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl text-white text-center">
                                        <h4 className="font-bold text-xl mb-2">Cần hỗ trợ tư vấn?</h4>
                                        <p className="text-blue-100 text-sm mb-4">Liên hệ với chuyên gia của chúng tôi để được giải đáp thắc mắc về tài liệu này.</p>
                                        <a href="/#contact" className="inline-block bg-white text-brand-blue px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">Liên hệ ngay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LibraryDetail;
