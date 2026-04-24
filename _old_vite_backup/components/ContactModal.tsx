import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { api } from '../services/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: defaultService,
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitContact(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', email: '', company: '', service: defaultService, note: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isSuccess ? "" : "Đăng ký tư vấn miễn phí"}>
      <div className="p-6">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h4>
            <p className="text-gray-600 mb-8">
              Cảm ơn bạn đã quan tâm. Chuyên gia của chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ làm việc.
            </p>
            <Button onClick={handleClose} className="w-full justify-center">Đóng</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="0912..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="email@congty.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên doanh nghiệp</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                placeholder="Công ty ABC..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ quan tâm</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
              >
                <option value="">-- Chọn dịch vụ --</option>
                <option value="CIC-PM">Phần mềm Quản lý dự án (CIC-PM)</option>
                <option value="CIC-CDE">Môi trường dữ liệu chung (CDE)</option>
                <option value="Legal">Tư vấn Pháp lý BIM</option>
                <option value="Training">Đào tạo & Chuyển giao</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú thêm</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                placeholder="Nhu cầu cụ thể của bạn..."
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full justify-center mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : "Gửi yêu cầu"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Thông tin của bạn được bảo mật tuyệt đối theo Chính sách quyền riêng tư.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ContactModal;