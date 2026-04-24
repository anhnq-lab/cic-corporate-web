import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useToast } from './Toast';

type CaptureMode = 'download' | 'consultation';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    resourceName?: string;
    mode?: CaptureMode;
    defaultContext?: string; // Pre-filled context like "Interested in BIM Training"
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
    isOpen,
    onClose,
    resourceName = 'Tài liệu BIM',
    mode = 'download',
    defaultContext
}) => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        problem: '', // For consultation
        projectScale: '' // For consultation
    });
    const [loading, setLoading] = useState(false);

    // Reset or pre-fill when opening
    useEffect(() => {
        if (isOpen && defaultContext) {
            setFormData(prev => ({ ...prev, problem: defaultContext }));
        }
    }, [isOpen, defaultContext]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Lead Captured:', { ...formData, resource: resourceName, mode });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            const successMsg = mode === 'download'
                ? `Link tải ${resourceName} đã được gửi vào email của bạn.`
                : 'Yêu cầu tư vấn của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm nhất!';

            showToast(successMsg, 'success');
            onClose();
            setFormData({ name: '', email: '', phone: '', company: '', role: '', problem: '', projectScale: '' });
        } catch (error) {
            showToast('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const title = mode === 'download' ? `Tải xuống ${resourceName}` : `Đăng ký Tư vấn`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-gray-600 mb-6 font-medium">
                        {mode === 'download'
                            ? 'Vui lòng để lại thông tin để nhận đường link tải xuống tài liệu chuyên sâu này.'
                            : 'Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-gray-700">Họ và tên *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Nguyễn Văn A"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-gray-700">Số điện thoại *</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="090 xxx xxxx"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-gray-700">Email nhận tài liệu *</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="name@company.com"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-gray-700">Công ty / Tổ chức</label>
                        <input
                            type="text"
                            name="company"
                            placeholder="Tên công ty của bạn"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>

                    {mode === 'consultation' && (
                        <>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-gray-700">Quy mô Doanh nghiệp / Dự án</label>
                                <select
                                    name="projectScale"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                                    value={formData.projectScale}
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn quy mô...</option>
                                    <option value="small">Nhỏ (&lt; 20 nhân sự)</option>
                                    <option value="medium">Vừa (20 - 100 nhân sự)</option>
                                    <option value="large">Lớn (&gt; 100 nhân sự)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-gray-700">Nhu cầu / Vấn đề cần tư vấn</label>
                                <textarea
                                    name="problem"
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                                    placeholder="Ví dụ: Cần tư vấn áp dụng BIM theo NĐ 175..."
                                    value={formData.problem}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? 'Đang xử lý...' : (mode === 'download' ? 'Tải xuống ngay' : 'Gửi yêu cầu')}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default LeadCaptureModal;
