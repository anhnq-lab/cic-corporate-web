import React from 'react';
import Button from './Button';

const ToolsCTA: React.FC = () => {
  return (
    <div className="bg-brand-blue py-20 relative overflow-hidden" id="tools">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-brand-orange opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Bạn còn vướng mắc về pháp lý?</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Đừng để các quy định phức tạp làm chậm tiến độ chuyển đổi số của bạn. 
              Trợ lý AI của chúng tôi sẵn sàng giải đáp mọi thắc mắc 24/7 dựa trên cơ sở dữ liệu pháp luật hiện hành.
            </p>
            <Button variant="white" size="lg">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Chat với Chuyên gia AI ngay
            </Button>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl p-6 shadow-2xl relative">
              {/* Fake Chat UI */}
              <div className="flex items-center space-x-3 mb-6 border-b pb-4">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">BIM Legal Assistant</div>
                  <div className="text-xs text-green-500 font-medium">Đang trực tuyến</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex-shrink-0 mr-2 mt-1 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-700">
                    Chào bạn! Tôi có thể giúp gì về lộ trình áp dụng BIM theo Nghị định 175/2024/NĐ-CP?
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-brand-blue text-white rounded-2xl rounded-tr-none p-3 text-sm">
                    Dự án nào bắt buộc áp dụng BIM từ năm 2025?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2 mt-1"></div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex-shrink-0 mr-2 mt-1 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-700">
                    Theo Khoản 1 Điều 8 Nghị định 175, áp dụng BIM bắt buộc đối với dự án đầu tư công từ nhóm B trở lên.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t relative">
                <div className="w-full h-10 bg-gray-50 rounded-full border border-gray-200 px-4 flex items-center text-gray-400 text-sm">
                  Nhập câu hỏi của bạn...
                  <svg className="w-4 h-4 text-brand-blue absolute right-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsCTA;