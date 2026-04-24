import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200/50">
           <div className="p-4">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">10k+</div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Câu hỏi pháp lý được giải đáp</p>
           </div>
           <div className="p-4">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">500+</div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Doanh nghiệp đánh giá</p>
           </div>
           <div className="p-4">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">98%</div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Độ chính xác phản hồi</p>
           </div>
           <div className="p-4">
              <div className="text-4xl font-extrabold text-gray-900 mb-2">24/7</div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Hỗ trợ tự động</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;