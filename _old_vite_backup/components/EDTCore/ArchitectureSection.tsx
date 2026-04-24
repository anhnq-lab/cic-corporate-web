import React from 'react';

const ArchitectureSection: React.FC = () => {
    const pillars = [
        { title: 'Quản lý Dự án', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
        { title: 'Quản lý Hợp đồng', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { title: 'Quản lý Thanh toán', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: 'Quản lý Nhân sự', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { title: 'Quản lý Tài liệu (CDE Hub)', icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z' },
        { title: 'Tích hợp AI', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Cấu trúc 6 Trụ cột Quản trị
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hệ thống được xây dựng trên 1 Core duy nhất nhưng được cấu hình (config) thành <strong className="text-blue-600">4 Phân hệ chuyên biệt</strong>. Mỗi phân hệ đều bao gồm 6 Module quản trị toàn diện.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pillar.icon} />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 text-center">{pillar.title}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 text-center border-b pb-4">
                        4 Phân Hệ Chuyên Biệt
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100 hover:shadow-md transition-all">
                            <div className="font-bold text-red-800 mb-2 truncate">Ban QLDA (PMU)</div>
                            <div className="text-xs text-red-600">Compliance & Legal</div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                            <div className="font-bold text-blue-800 mb-2 truncate">Chủ đầu tư BĐS</div>
                            <div className="text-xs text-blue-600">Efficiency & ROI</div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-all">
                            <div className="font-bold text-purple-800 mb-2 truncate">Đơn vị Tư vấn</div>
                            <div className="text-xs text-purple-600">Productivity & Docs</div>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 hover:shadow-md transition-all">
                            <div className="font-bold text-orange-800 mb-2 truncate">Nhà thầu Thi công</div>
                            <div className="text-xs text-orange-600">Control & Site</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureSection;
