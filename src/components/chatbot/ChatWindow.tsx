"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCICChat } from "@/hooks/useCICChat";
import { Bot, Send, X, RefreshCcw, MessageSquarePlus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";

interface ChatWindowProps {
  onClose: () => void;
}

const SUGGESTIONS = [
  "CIC cung cấp các phần mềm dự toán nào?",
  "Giải pháp CDE của CIC là gì?",
  "Báo giá phần mềm...",
];

export function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, setInput, handleSubmit, isLoading, reload, stop } = useCICChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle enter to submit
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Use standard form submit
      const formEvent = new Event("submit", { bubbles: true, cancelable: true });
      e.currentTarget.form?.dispatchEvent(formEvent);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const hasMessages = messages && messages.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col w-[350px] md:w-[400px] h-[550px] md:h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(249,115,22,0.3)] border border-slate-200 dark:border-slate-800 overflow-hidden font-sans relative"
    >
      {/* Background glow fx */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="z-10 px-5 py-4 bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-800 dark:to-orange-700 flex items-center justify-between text-white shadow-sm shrink-0 border-b border-orange-400 dark:border-orange-900">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
            <Bot className="w-4 h-4 text-white" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-orange-600"></div>
          </div>
          <div>
            <h3 className="font-semibold text-[16px] leading-tight flex items-center gap-1.5">
              CIC AI <Sparkles size={14} className="text-orange-200" />
            </h3>
            <p className="text-[11px] text-orange-50 mt-0.5 tracking-wider font-medium opacity-90">Bảo mật Server Toàn diện</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => reload()}
            type="button"
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            title="Tải lại đoạn chat"
          >
            <RefreshCcw size={16} />
          </button>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2 bg-slate-50/50 dark:bg-slate-950 custom-scrollbar relative">
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
             <Bot size={40} className="text-orange-500/50" />
             <p className="text-sm font-medium text-slate-500">Xin chào, tôi là CIC AI...</p>
          </div>
        )}
        {hasMessages && messages.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <ChatMessage message={m as any} />
          </motion.div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-slate-800 border border-orange-200 flex items-center justify-center flex-shrink-0 mr-3 shadow-sm">
              <Bot className="w-4 h-4 text-orange-600" />
            </div>
            <div className="bg-white dark:bg-slate-800 px-4 py-3.5 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-1.5 h-[44px]">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Container (Floats above input) */}
      {!isLoading && messages.length <= 1 && (
        <div className="px-3 pb-2 pt-1 flex flex-wrap gap-1.5 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur shrink-0 border-t border-slate-100 dark:border-slate-800">
          {SUGGESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              type="button"
              className="text-[11px] px-3 py-1.5 bg-white dark:bg-slate-800 border border-orange-200/50 dark:border-orange-900/50 hover:border-orange-400 text-orange-700 dark:text-orange-300 rounded-full transition-all flex items-center gap-1 shadow-sm font-medium"
            >
              <MessageSquarePlus size={12} className="text-orange-500" />
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 z-10">
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-end bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-400 transition-all shadow-sm">
            <textarea
              value={input || ""}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nhập câu trả lời tại đây..."
              className="w-full pl-4 pr-12 py-3.5 min-h-[52px] max-h-[120px] rounded-xl bg-transparent border-none outline-none focus:ring-0 text-[14px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 resize-none overflow-y-auto"
              disabled={isLoading}
              rows={1}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={() => stop()}
                className="absolute right-2 bottom-2 p-2 bg-red-600 text-white rounded-lg transition-all"
              >
                <X size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input?.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-400 disabled:opacity-50 transition-all duration-200 shadow-md shadow-orange-500/20 cursor-pointer"
              >
                <Send size={16} className={input?.trim() ? "ml-0.5" : ""} />
              </button>
            )}
          </div>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-400">
            Trợ lý AI đang trong quá trình thử nghiệm. Vui lòng xác minh lại thông tin.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
