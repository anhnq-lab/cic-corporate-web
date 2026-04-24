"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";
import { Message } from "ai";

interface ChatMessageProps {
  message: Message;
}

interface CustomLinkProps {
  href?: string;
  children?: React.ReactNode;
}

const CustomLink = ({ href, children }: CustomLinkProps) => {
  if (href?.includes("cic.com.vn/san-pham/")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block my-2 no-underline group hover:no-underline">
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-orange-200 dark:border-orange-900/50 rounded-xl shadow-sm hover:shadow-md hover:border-orange-400 dark:hover:border-orange-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 text-orange-600 dark:text-orange-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{children}</p>
            <p className="text-[11px] text-orange-600 dark:text-orange-400 mt-0.5 group-hover:underline">Khám phá ngay &rarr;</p>
          </div>
        </div>
      </a>
    );
  }
  
  if (href?.includes("cic.com.vn/tin-tuc/")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span className="font-medium underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2">{children}</span>
      </a>
    );
  }

  return <a href={href} className="text-orange-600 hover:text-orange-700 dark:text-orange-400 underline underline-offset-2" target="_blank" rel="noopener noreferrer">{children}</a>;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 border border-orange-200 flex items-center justify-center flex-shrink-0 mr-3 mt-1 shadow-sm">
          <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
      )}
      <div
        className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl rounded-tr-sm"
            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <div className="font-medium">{message.content}</div>
        ) : (
          <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="pl-1 leading-snug">{children}</li>,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-slate-50 dark:bg-slate-800/80">{children}</thead>,
                th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">{children}</th>,
                td: ({ children }) => <td className="px-3 py-2 border-t border-slate-100 dark:border-slate-700/50">{children}</td>,
                a: CustomLink,
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="px-1.5 py-0.5 rounded-md bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 font-mono text-[12px]"
                      {...props}
                    />
                  ) : (
                    <code {...props} />
                  ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
