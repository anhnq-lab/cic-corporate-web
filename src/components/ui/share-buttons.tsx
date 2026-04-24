"use client";

import React from "react";
import { Link2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const shareLinks = [
    {
      name: "Facebook",
      label: "FB",
      color: "hover:bg-[#1877F2] hover:text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      label: "in",
      color: "hover:bg-[#0A66C2] hover:text-white",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">Chia sẻ:</span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chia sẻ lên ${link.name}`}
          className={`p-2 rounded-lg border border-border/60 text-muted-foreground font-bold text-xs transition-all duration-200 ${link.color}`}
        >
          {link.label}
        </a>
      ))}

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Sao chép liên kết"
        className="relative p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-4 h-4 text-green-500" />
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Link2 className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
