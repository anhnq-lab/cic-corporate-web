import React from 'react';

const NetworkEffectSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-6 tracking-wide uppercase">
                            The CDE Network Effect
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Giá Trị Của Mạng Lưới CDE
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Tính năng CDE biến phần mềm từ công cụ quản lý nội bộ thành Mạng lưới kết nối toàn diện.
                        </p>

                        <div className="space-y-6">
                            <div className="flex">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Liên thông Dữ liệu Quốc gia</h4>
                                    <p className="mt-1 text-gray-600 text-sm">
                                        Tự động trích xuất dữ liệu lên Cổng thông tin Chính phủ/Bộ Xây dựng. <br />
                                        <span className="text-red-500 font-medium">Giảm 90% thời gian làm báo cáo số liệu cho PMU.</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Quy trình Khép kín</h4>
                                    <p className="mt-1 text-gray-600 text-sm">Một bản vẽ Nhà thầu up lên -&gt; Tư vấn nhận thông báo Review -&gt; CĐT phê duyệt. Không cần gửi Email/Zalo thủ công.</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Minh bạch hóa (Audit Trail)</h4>
                                    <p className="mt-1 text-gray-600 text-sm">
                                        Lưu vết lịch sử thao tác giúp định danh trách nhiệm rõ ràng.
                                        <br /><span className="italic text-gray-400 text-xs">(Theo yêu cầu Điều 54 Dự thảo Luật Xây dựng)</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Single Source of Truth</h4>
                                    <p className="mt-1 text-gray-600 text-sm">Chỉ có một phiên bản hồ sơ duy nhất (mới nhất) tồn tại trên hệ thống.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract Network Visualization */}
                        <div className="absolute inset-0 bg-indigo-50 rounded-full opacity-50 filter blur-3xl animate-pulse"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            {/* National Gateway Connection */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm z-20 flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping"></span>
                                KẾT NỐI CỔNG QUỐC GIA (NĐ 111)
                            </div>

                            <div className="flex justify-center mb-8 mt-4">
                                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 relative">
                                    CDE HUB
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="font-bold text-gray-800">PMU</div>
                                    <div className="text-xs text-gray-500">Thẩm định</div>
                                    <div className="h-1 w-full bg-indigo-200 mt-2 mx-auto rounded overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full animate-progress-loading"></div>
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="font-bold text-gray-800">Chủ đầu tư</div>
                                    <div className="text-xs text-gray-500">Phê duyệt</div>
                                    <div className="h-1 w-full bg-indigo-200 mt-2 mx-auto rounded overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full animate-progress-loading" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="font-bold text-gray-800">Tư vấn</div>
                                    <div className="text-xs text-gray-500">Review</div>
                                    <div className="h-1 w-full bg-indigo-200 mt-2 mx-auto rounded overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full animate-progress-loading" style={{ animationDelay: '1s' }}></div>
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="font-bold text-gray-800">Nhà thầu</div>
                                    <div className="text-xs text-gray-500">Submit</div>
                                    <div className="h-1 w-full bg-indigo-200 mt-2 mx-auto rounded overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full animate-progress-loading" style={{ animationDelay: '1.5s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NetworkEffectSection;
