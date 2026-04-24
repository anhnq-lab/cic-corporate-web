import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api'; // Ensure api returns extended NewsItem
import Navbar from './Navbar';
import Footer from './Footer';
import { NewsItem } from '../types';
import SEO from './SEO';
import SocialShare from './SocialShare';

const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        window.scrollTo(0, 0); // Scroll to top on new article

        // Fetch article and related news
        Promise.all([
            api.getNewsDetail(id),
            api.getRelatedNews(id)
        ])
            .then(([data, related]) => {
                setNews(data as NewsItem);
                setRelatedNews(related as NewsItem[]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Không thể tải bài viết.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </div>
    );

    if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;

    if (!news) return <div className="min-h-screen flex justify-center items-center">Không tìm thấy bài viết.</div>;

    const renderVideo = (url: string) => {
        // Simple check for YouTube embed
        const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');

        return (
            <div className="my-8 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-black aspect-video relative group">
                {isYouTube ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={url}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                ) : (
                    <video controls className="w-full h-full">
                        <source src={url} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                )}
            </div>
        );
    };

    const renderAudio = (url: string) => {
        return (
            <div className="my-8 bg-gray-100 p-6 rounded-xl border border-gray-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm mb-2">Nghe nội dung bài viết (Podcast)</h4>
                    <audio controls className="w-full h-10">
                        <source src={url} type="audio/mpeg" />
                        Trình duyệt của bạn không hỗ trợ thẻ audio.
                    </audio>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            {news && (
                <SEO
                    title={news.title}
                    description={news.excerpt}
                    image={news.imageUrl}
                    url={window.location.href}
                    type="article"
                />
            )}
            {/* Header / Nav Placeholder - Using simple header as before */}
            <div className="bg-white shadow sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-brand-blue rounded mr-2 flex items-center justify-center text-white">
                            <span className="font-bold">B</span>
                        </div>
                        BIM Hub VN
                    </Link>
                    <Link to="/" className="flex items-center text-brand-blue font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm md:text-base">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Quay lại
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl flex-grow">
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Hero Section */}
                    <div className="p-8 md:p-12 pb-0">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {news.category}
                            </span>
                            {news.audioUrl && (
                                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" /></svg>
                                    Audio
                                </span>
                            )}
                            {news.videoUrl && (
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                                    Video
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {news.title}
                        </h1>

                        <div className="flex items-center border-b border-gray-100 pb-8 mb-8">
                            <div className="flex items-center mr-6">
                                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${news.author || 'Admin'}&background=random`} alt="Author" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{news.author || 'Ban Biên Tập'}</p>
                                    <p className="text-xs text-gray-500">Tác giả</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-200 mr-6"></div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{news.date}</p>
                                <p className="text-xs text-gray-500">Ngày đăng</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {news.imageUrl && (
                        <div className="w-full h-[400px] md:h-[500px] relative">
                            <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}

                    <div className="p-8 md:p-12 pt-10">
                        {/* Audio Player if present */}
                        {news.audioUrl && renderAudio(news.audioUrl)}

                        {/* Video Player if present */}
                        {news.videoUrl && renderVideo(news.videoUrl)}

                        {/* Content */}
                        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                            {news.content ? (
                                <div dangerouslySetInnerHTML={{ __html: news.content }} />
                            ) : (
                                <p>{news.excerpt}</p>
                            )}
                        </div>

                        {/* Social Share */}
                        <SocialShare url={window.location.href} title={news.title} />

                        {/* Attachments Section */}
                        {news.attachments && news.attachments.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Tài liệu đính kèm
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {news.attachments.map((file: any, index: number) => (
                                        <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition-colors group cursor-pointer">
                                            <div className="bg-red-100 text-red-600 p-3 rounded-lg mr-4 group-hover:bg-white group-hover:text-red-500 transition-colors">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 truncate group-hover:text-brand-blue">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size} • {file.type ? file.type.toUpperCase() : 'FILE'}</p>
                                            </div>
                                            <div className="text-gray-400 group-hover:text-brand-blue">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Related News Section */}
                {relatedNews.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedNews.map((item) => (
                                <Link to={`/news/${item.id}`} key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2 py-1 rounded uppercase">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Bottom */}
                <div className="mt-12 text-center border-t border-gray-200 pt-8">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-blue font-medium transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Quay lại danh sách tin tức
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NewsDetail;
