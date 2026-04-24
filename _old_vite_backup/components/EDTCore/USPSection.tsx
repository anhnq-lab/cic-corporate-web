import React from 'react';

const USPSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-brand-darkBlue mb-4">
                        Giá Trị Cốt Lõi (USP)
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Sự kết hợp hoàn hảo giữa nghiệp vụ chuyên sâu và công nghệ tiên phong.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* USP 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 self-start">
                            <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sức Mạnh Hợp Nhất</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Kết hợp giữa <strong className="text-brand-blue">Nghiệp vụ chuyên sâu & Quan hệ ngành của CIC</strong> + <strong className="text-brand-orange">Sức mạnh công nghệ và AI</strong> của Đối tác Chiến lược.
                        </p>
                    </div>

                    {/* USP 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 self-start">
                            <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Triết Lý "May Đo"</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Phát triển dựa trên <strong className="text-brand-blue">Lõi (Core) chuẩn hóa</strong>. Không bán phần mềm đóng gói cứng nhắc, nhưng tối ưu chi phí bằng cách không xây mới từ con số 0.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default USPSection;
