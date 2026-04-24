import React from 'react';
import { ROLE_CARDS } from '../constants';
import Button from './Button';

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Giải pháp chuyên biệt cho từng đối tượng
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lựa chọn lộ trình phù hợp với vai trò của doanh nghiệp bạn trong chuỗi cung ứng xây dựng để tối ưu hóa hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLE_CARDS.map((card, index) => (
            <div 
              key={card.id} 
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group flex flex-col`}
            >
              
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">{card.description}</p>

              <ul className="space-y-3 mb-8">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant='outline' 
                className="w-full justify-center text-sm"
                size="sm"
              >
                {card.ctaText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;