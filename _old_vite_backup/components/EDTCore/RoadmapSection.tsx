import React from 'react';

const RoadmapSection: React.FC = () => {
    const steps = [
        {
            period: 'Bước 1',
            title: 'Khảo sát & Tư vấn',
            description: 'Đánh giá hiện trạng quy trình, xác định "nỗi đau" và tư vấn giải pháp chuyển đổi số phù hợp nhất.'
        },
        {
            period: 'Bước 2',
            title: 'Cấu hình & "May đo"',
            description: 'Thiết lập hệ thống EDT CORE, tùy biến quy trình và biểu mẫu theo đặc thù riêng của từng doanh nghiệp.'
        },
        {
            period: 'Bước 3',
            title: 'Đào tạo & Bàn giao',
            description: 'Đào tạo nhân sự sử dụng thành thạo, UAT và bàn giao toàn bộ hệ thống để đi vào vận hành thực tế.'
        }
    ];

    return (
        <div className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy trình Triển khai Chuẩn hóa</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Chúng tôi đồng hành cùng doanh nghiệp từ khâu khảo sát đến khi vận hành ổn định.
                </p>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative z-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 group-hover:scale-110 transition-transform ring-4 ring-white">
                                    {index + 1}
                                </div>
                                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold mb-3">
                                    {step.period}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapSection;
