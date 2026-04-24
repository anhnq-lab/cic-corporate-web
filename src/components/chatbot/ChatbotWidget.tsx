"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ChatWindow } from "./ChatWindow";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <div className="mb-4 pointer-events-auto origin-bottom-right rounded-2xl">
            <ChatWindow onClose={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border-0 ${
          isOpen
            ? "bg-slate-800 text-white rotate-90 scale-0 opacity-0 absolute"
            : "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white hover:shadow-orange-500/40"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-orange-500 blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <MessageCircle size={28} className="relative z-10" />

        {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}
