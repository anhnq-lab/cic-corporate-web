import React from 'react';

const LegalBasisSection: React.FC = () => {
    const documents = [
        {
            code: 'Nghị quyết 57-NQ/TW',
            date: '12/2024',
            title: 'Chuyển đổi số Quốc gia',
            description: 'Xác định chuyển đổi số là động lực thúc đẩy lực lượng sản xuất. EDT CORE là công cụ cụ thể hóa chủ trương này.',
            borderColor: 'border-blue-500',
            textColor: 'text-blue-700'
        },
        {
            code: 'Nghị định 111/2024/NĐ-CP',
            date: '2024',
            title: 'Cơ sở dữ liệu Quốc gia',
            description: 'EDT CORE tự động đồng bộ dữ liệu lên hệ thống Quốc gia, giúp PMU không phải nhập liệu 2 lần.',
            borderColor: 'border-red-500',
            textColor: 'text-red-700'
        },
        {
            code: 'Nghị định 175/2024/NĐ-CP',
            date: '2024',
            title: 'Bắt buộc áp dụng BIM',
            description: 'Áp dụng BIM cho dự án nhóm B trở lên. Hệ thống tích hợp sẵn CDE & BIM Viewer để đáp ứng quy định.',
            borderColor: 'border-green-500',
            textColor: 'text-green-700'
        },
        {
            code: 'QĐ 1644/QĐ-BXD',
            date: '09/2025',
            title: 'Chiến lược CĐS Bộ Xây dựng',
            description: 'Mục tiêu 100% hồ sơ công việc xử lý trên môi trường mạng giai đoạn 2025-2030.',
            borderColor: 'border-purple-500',
            textColor: 'text-purple-700'
        }
    ];

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Căn cứ Pháp lý & Chiến lược</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Đề án được xây dựng bám sát các văn bản chỉ đạo chiến lược mới nhất, đảm bảo tính tuân thủ và đón đầu xu thế.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.map((doc, index) => (
                        <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${doc.borderColor} hover:shadow-md transition-shadow relative overflow-hidden group`}>
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors"></div>

                            <div className={`text-xs font-bold ${doc.textColor} mb-2 relative z-10`}>
                                {doc.code}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 relative z-10 min-h-[56px] flex items-center">
                                {doc.title}
                            </h3>
                            <p className="text-sm text-gray-500 relative z-10">
                                {doc.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalBasisSection;
