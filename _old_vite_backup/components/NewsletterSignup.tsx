import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from './Toast';

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubscribe = async () => {
        if (!email) {
            showToast('Vui lòng nhập email', 'error');
            return;
        }
        setLoading(true);
        try {
            await api.subscribeNewsletter(email);
            showToast('Đăng ký nhận tin thành công!', 'success');
            setEmail('');
        } catch (error: any) {
            showToast(error.message || 'Có lỗi xảy ra', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Đăng ký nhận tin</h4>
            <p className="text-sm mb-4">Nhận thông báo mới nhất về pháp lý BIM.</p>
            <div className="flex flex-col space-y-3">
                <input
                    type="email"
                    placeholder="Email của bạn"
                    className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-blue text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="bg-brand-blue text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Đang gửi...' : 'Đăng ký ngay'}
                </button>
            </div>
        </div>
    );
};

export default NewsletterSignup;
