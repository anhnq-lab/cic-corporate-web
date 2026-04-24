import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

interface ChatWidgetProps {
  externalTrigger?: { message: string; timestamp: number } | null;
}

// Simple Bot Icon for ChatWidget (Not the complex 3D one)
const SimpleBotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4ZM12 20C9.33 20 7 18 7 15.5C7 15.22 7.22 15 7.5 15H16.5C16.78 15 17 15.22 17 15.5C17 18 14.67 20 12 20ZM7 11V13H5V11H7ZM19 11V13H17V11H19Z" fill="currentColor" />
  </svg>
);

const ChatWidget: React.FC<ChatWidgetProps> = ({ externalTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Chào bạn! Tôi là Trợ lý AI của CIC. \n\nTôi có thể giúp bạn tra cứu các văn bản pháp lý mới nhất (Nghị định 175, 111) hoặc tư vấn lộ trình BIM. Bạn cần hỗ trợ gì không?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle external trigger
  useEffect(() => {
    if (externalTrigger && externalTrigger.message) {
      setIsOpen(true);
      handleSendMessage(externalTrigger.message);
    }
  }, [externalTrigger]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const streamResponse = await sendMessageToGemini(userMessage.text);
      
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      let fullText = '';
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId ? { ...msg, text: fullText } : msg
          ));
        }
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Xin lỗi, hiện tại tôi đang gặp sự cố kết nối. Vui lòng kiểm tra lại mạng hoặc thử lại sau.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-fade-in-up font-sans">
          {/* Header - Simple Style */}
          <div className="bg-brand-blue p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white p-1">
                 <SimpleBotIcon />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Hỗ trợ CIC</h3>
                <p className="text-[10px] text-blue-100 flex items-center opacity-90">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Sẵn sàng
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue border border-blue-200 flex-shrink-0 flex items-center justify-center mr-2 mt-1 shadow-sm p-1.5">
                    <SimpleBotIcon />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-orange text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap markdown-body">{msg.text}</div>
                </div>
              </div>
            ))}
             {isLoading && (
               <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-brand-blue border border-blue-200 flex-shrink-0 flex items-center justify-center mr-2 mt-1 shadow-sm p-1.5">
                    <SimpleBotIcon />
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
               </div>
             )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi CIC về pháp lý BIM..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm"
              />
              <button 
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 w-9 h-9 bg-brand-blue text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button - Simple & Clean */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'hidden' : 'flex'} group items-center justify-center w-14 h-14 bg-brand-blue text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none z-50 overflow-visible p-3 relative`}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping duration-1000"></span>
        <SimpleBotIcon />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    </div>
  );
};

export default ChatWidget;