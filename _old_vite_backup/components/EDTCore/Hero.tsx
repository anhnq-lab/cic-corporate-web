import React from 'react';
import Button from '../Button';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 text-white pt-32 pb-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-sm mb-6 backdrop-blur-sm">
                        EDT CORE - Hệ điều hành số ngành Xây dựng
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                        Nền tảng Quản trị số <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                            Tiêu chuẩn & "May đo"
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Kết nối liền mạch CĐT - PMU - Tư vấn - Nhà thầu. Giải quyết "đứt gãy" thông tin và rủi ro pháp lý bằng công nghệ AI tiên tiến.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12 text-left">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-2 flex items-center text-blue-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Tầm nhìn
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Trở thành nền tảng quản trị tiêu chuẩn cho hệ sinh thái xây dựng Việt Nam.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-2 flex items-center text-teal-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                Sứ mệnh
                            </h3>
                            <p className="text-gray-400 text-sm">
                                "May đo" công nghệ dựa trên am hiểu nghiệp vụ sâu sắc để giải quyết triệt để nỗi đau của khách hàng.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="px-8 shadow-lg shadow-blue-500/25">
                            Liên hệ tư vấn
                        </Button>
                        <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                            Xem chi tiết giải pháp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
