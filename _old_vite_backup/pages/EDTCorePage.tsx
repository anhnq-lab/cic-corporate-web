import React, { useEffect } from 'react';
import Hero from '../components/EDTCore/Hero';
import USPSection from '../components/EDTCore/USPSection';
import LegalBasisSection from '../components/EDTCore/LegalBasisSection';
import ArchitectureSection from '../components/EDTCore/ArchitectureSection';
import NetworkEffectSection from '../components/EDTCore/NetworkEffectSection';
import RoiSection from '../components/EDTCore/RoiSection';
import RoadmapSection from '../components/EDTCore/RoadmapSection';
import CustomerSegments from '../components/EDTCore/CustomerSegments';
import ContactModal from '../components/ContactModal';
import SEO from '../components/SEO';

const EDTCorePage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isContactOpen, setIsContactOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="CIC Platform - Hệ điều hành số ngành Xây dựng"
                description="Nền tảng quản trị tiêu chuẩn (Standard Platform) kết nối CĐT - PMU - Tư vấn - Nhà thầu. Giải pháp chuyển đổi số toàn diện cho ngành xây dựng Việt Nam."
            />

            <Hero />

            {/* USP Section: Value Proposition (Hybrid Power & Tailor-made Philosophy) */}
            <USPSection />

            {/* Legal Basis & Strategy */}
            <LegalBasisSection />

            {/* Customer Segments: Pain Points & Solutions */}
            <CustomerSegments onContact={() => setIsContactOpen(true)} />

            {/* Product Strategy: 6 Pillars & 4 Modules */}
            <ArchitectureSection />

            {/* CDE Network Effect: Data Interoperability & Single Source of Truth */}
            <NetworkEffectSection />

            {/* Financials: ROI & P&L Forecast */}
            <RoiSection />

            {/* Timeline & Risk Management */}
            <RoadmapSection />

            <div className="py-20 bg-blue-600 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Sẵn sàng chuyển đổi số cùng CIC Platform?</h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        Hãy để chúng tôi đồng hành cùng bạn trên hành trình kiến tạo tương lai ngành xây dựng.
                    </p>
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        Đăng ký tư vấn ngay
                    </button>
                </div>
            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                defaultService="Tư vấn CIC Platform"
            />
        </div>
    );
};

export default EDTCorePage;
