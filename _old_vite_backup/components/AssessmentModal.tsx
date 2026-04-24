import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void; // Callback to open Contact Modal after score
}

const QUESTIONS = [
  {
    id: 1,
    question: "Doanh nghiệp của bạn đã có Quy trình BIM (BEP/EIR) chuẩn hóa chưa?",
    options: [
      { text: "Chưa có gì", score: 1 },
      { text: "Đang xây dựng/Dùng mẫu trên mạng", score: 2 },
      { text: "Đã có và áp dụng cho một số dự án", score: 3 },
      { text: "Đã chuẩn hóa ISO 19650 cho toàn công ty", score: 4 }
    ]
  },
  {
    id: 2,
    question: "Bạn đang quản lý dữ liệu dự án (CDE) như thế nào?",
    options: [
      { text: "Gửi file qua Zalo/Email", score: 1 },
      { text: "Google Drive / OneDrive miễn phí", score: 2 },
      { text: "Server nội bộ (NAS/File Server)", score: 3 },
      { text: "Nền tảng CDE chuyên dụng (BIM 360, ACC, CIC-CDE)", score: 4 }
    ]
  },
  {
    id: 3,
    question: "Mức độ ứng dụng mô hình 3D trong phối hợp (Coordination)?",
    options: [
      { text: "Chỉ dùng 2D CAD", score: 1 },
      { text: "Dựng 3D để render ảnh", score: 2 },
      { text: "Dùng 3D để check va chạm (Clash Detection)", score: 3 },
      { text: "Phối hợp 3D real-time trên Cloud", score: 4 }
    ]
  }
];

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0); // 0: Start, 1-N: Questions, 99: Result
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleStart = () => setStep(1);

  const handleAnswer = (scoreValue: number) => {
    const newAnswers = [...answers, scoreValue];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Calculate Result
      const total = newAnswers.reduce((a, b) => a + b, 0);
      const avg = (total / QUESTIONS.length).toFixed(1);
      setScore(parseFloat(avg));
      setStep(99);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setScore(0);
  };

  const closeAndReset = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset} title="Đánh giá năng lực BIM">
      <div className="p-6">
        
        {/* Intro Step */}
        {step === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Bài kiểm tra nhanh</h4>
            <p className="text-gray-600 mb-8">
              Chỉ mất 2 phút để biết doanh nghiệp bạn đang ở đâu trên bản đồ chuyển đổi số ngành xây dựng.
            </p>
            <Button onClick={handleStart} className="w-full justify-center">Bắt đầu ngay</Button>
          </div>
        )}

        {/* Question Steps */}
        {step > 0 && step <= QUESTIONS.length && (
          <div>
            <div className="mb-4 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide">
              <span>Câu hỏi {step}/{QUESTIONS.length}</span>
              <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8">
              <div 
                className="bg-brand-blue h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-6">
              {QUESTIONS[step - 1].question}
            </h4>

            <div className="space-y-3">
              {QUESTIONS[step - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-blue-50 transition-all flex items-center group"
                >
                  <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center group-hover:border-brand-blue">
                    <div className="w-3 h-3 rounded-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-700 group-hover:text-brand-blue font-medium">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Step */}
        {step === 99 && (
          <div className="text-center">
             <div className="mb-6">
                <span className="text-gray-500 text-sm">Điểm số của bạn</span>
                <div className="text-6xl font-extrabold text-brand-blue my-2">{score}<span className="text-2xl text-gray-400 font-normal">/4.0</span></div>
                <div className="text-sm font-medium px-3 py-1 bg-gray-100 inline-block rounded-full">
                   {score < 2 ? "Mức độ: Sơ khai" : score < 3.5 ? "Mức độ: Đang phát triển" : "Mức độ: Tiên tiến"}
                </div>
             </div>
             
             <p className="text-gray-600 mb-8 text-sm">
                {score < 2 
                  ? "Doanh nghiệp bạn cần xây dựng nền tảng pháp lý và quy trình ngay lập tức để tránh rủi ro." 
                  : "Bạn đã có nền tảng tốt. Hãy tối ưu hóa hiệu suất bằng các công cụ tự động hóa."}
             </p>

             <div className="bg-blue-50 p-4 rounded-xl mb-6 text-left">
                <h5 className="font-bold text-brand-blue text-sm mb-2">Đề xuất lộ trình:</h5>
                <ul className="text-sm text-gray-700 space-y-2">
                   <li className="flex items-start"><svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Thiết lập môi trường CDE</li>
                   <li className="flex items-start"><svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Đào tạo nhận thức ISO 19650</li>
                </ul>
             </div>

             <div className="flex gap-3">
               <Button variant="outline" onClick={closeAndReset} className="w-1/2 justify-center">Làm lại</Button>
               <Button 
                 onClick={() => { closeAndReset(); onComplete(); }} 
                 className="w-1/2 justify-center"
                >
                  Nhận báo cáo chi tiết
               </Button>
             </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AssessmentModal;