import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Button from './Button';

interface PricingSectionProps {
  onContact?: (planName: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onContact }) => {
  const [activeTab, setActiveTab] = useState<'software' | 'service'>('software');
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    api.getPricing().then(data => setPackages(data));
  }, []);

  const softwarePlans = packages.filter(plan => plan.type === 'software' || !plan.type);
  const servicePlans = packages.filter(plan => plan.type === 'service');

  return (
    <div className="py-20 bg-gray-50 scroll-mt-20" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lựa chọn gói phù hợp
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Giải pháp linh hoạt cho mọi quy mô doanh nghiệp
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex bg-gray-200 p-1 rounded-full relative">
            <button
              onClick={() => setActiveTab('software')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${activeTab === 'software' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Thanh toán năm (Tiết kiệm 20%)
            </button>
            <button
              onClick={() => setActiveTab('software')} // Kept simple for UI demo
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${activeTab === 'service' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Thanh toán tháng
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {softwarePlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 border relative flex flex-col hover:-translate-y-2 transition-transform duration-300 ${plan.isPopular
                  ? 'border-brand-blue shadow-xl ring-2 ring-brand-blue/10 scale-105 z-10'
                  : 'border-gray-200 shadow-sm hover:shadow-lg'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  PHỔ BIẾN NHẤT
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-2 ${plan.isPopular ? 'text-brand-blue' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500 text-sm font-medium">{plan.period}</span>}
              </div>

              <div className="mb-8 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <div className={`mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${feature.startsWith('Không') ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'}`}>
                        {feature.startsWith('Không') ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        )}
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.isPopular ? 'primary' : 'outline'}
                className="w-full justify-center"
                onClick={() => onContact && onContact(plan.name)}
              >
                {plan.ctaText}
              </Button>
            </div>
          ))}
        </div>

        {/* Services Section Below */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Dịch vụ Tư vấn Chuyên sâu</h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-sm">
            Chúng tôi không chỉ cung cấp công cụ, chúng tôi đồng hành cùng sự thành công của dự án bạn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {servicePlans.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-6 items-start">
                <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${service.id === 'legal-service' ? 'bg-blue-50 text-brand-blue' : 'bg-orange-50 text-brand-orange'}`}>
                  {service.id === 'legal-service' ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 self-center">
                  <Button variant="ghost" size="sm" className="text-brand-blue hover:bg-blue-50" onClick={() => onContact && onContact(service.name)}>
                    Xem chi tiết <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="text-brand-blue font-bold text-sm hover:underline" onClick={(e) => { e.preventDefault(); onContact && onContact('All Services'); }}>Xem tất cả dịch vụ &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;