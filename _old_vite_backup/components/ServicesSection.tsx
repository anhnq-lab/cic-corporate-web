import React from 'react';
import { SERVICES_DATA } from '../constants';
import Button from './Button';

interface ServicesSectionProps {
    onConsultation?: (serviceName: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onConsultation }) => {
    return (
        <div className="py-20 bg-white" id="services">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Dịch vụ chuyên nghiệp
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Giải pháp toàn diện từ tư vấn, đào tạo đến cung cấp nền tảng công nghệ cho doanh nghiệp xây dựng.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES_DATA.map((service) => (
                        <div
                            key={service.id}
                            className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                            <p className="text-gray-600 mb-8 text-center text-sm leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-4 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant="primary"
                                className="w-full justify-center"
                                onClick={() => onConsultation && onConsultation(service.title)}
                            >
                                {service.ctaText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
