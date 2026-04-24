import React from 'react';

const RoiSection: React.FC = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Hiệu quả Đầu tư (ROI) cho Khách hàng
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Việc áp dụng EDT CORE không chỉ là chuyển đổi số, mà là một khoản đầu tư sinh lời thông qua việc cắt giảm lãng phí và rủi ro.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Tiết kiệm 30-40% Chi phí Vận hành</h4>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Giảm tải nhân sự hành chính, chi phí in ấn, lưu trữ hồ sơ và các quy trình thủ công không tên.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Triệt tiêu Rủi ro Pháp lý</h4>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Không còn nỗi lo xuất toán, phạt hợp đồng hay sai phạm quy trình nhờ hệ thống cảnh báo sớm (Compliance Core).
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-900">Nâng cao Năng lực Cạnh tranh</h4>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Sở hữu hệ thống quản trị chuẩn mực giúp doanh nghiệp dễ dàng trúng thầu và thu hút đầu tư.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-8 lg:p-12 relative overflow-hidden flex items-center justify-center">
                        {/* Circle Backgrounds */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl font-bold mb-8 opacity-90">Tại sao chọn EDT CORE?</h3>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="text-4xl font-bold text-teal-300 mb-2">90%</div>
                                    <div className="text-xs text-gray-300 uppercase tracking-wide">Thời gian báo cáo</div>
                                    <div className="text-xs text-green-400 mt-1">Đã được cắt giảm</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="text-4xl font-bold text-blue-300 mb-2">100%</div>
                                    <div className="text-xs text-gray-300 uppercase tracking-wide">Dữ liệu Số hóa</div>
                                    <div className="text-xs text-blue-200 mt-1">Tra cứu tức thì</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="text-4xl font-bold text-purple-300 mb-2">0%</div>
                                    <div className="text-xs text-gray-300 uppercase tracking-wide">Giấy tờ in ấn</div>
                                    <div className="text-xs text-purple-200 mt-1">Môi trường xanh</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="text-4xl font-bold text-orange-300 mb-2">24/7</div>
                                    <div className="text-xs text-gray-300 uppercase tracking-wide">Giám sát</div>
                                    <div className="text-xs text-orange-200 mt-1">Mọi lúc mọi nơi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoiSection;
