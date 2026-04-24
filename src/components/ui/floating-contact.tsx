"use client";

import React from "react";
import { Phone } from "lucide-react";

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M21.1 10.3c0 4.6-5.4 7.6-10.4 7.4-1 .6-2.5 1.7-4.2 2 .5-1.5.8-2.6.8-3.3-3-1.6-4.5-4-4.5-6.1C2.8 5.7 7.5 2.5 13.9 2.5c5.3 0 7.2 3.8 7.2 7.8Z" />
    <path
      fill="currentColor"
      d="M10.8 11.2V9.8L7.4 9v2.5l2.2-.4s-2.1.8-2.1 1c.2 1.3 1.3 1.2 1.3 1.2l-1.3 1c0 0 2.2-2 3.3-2.1Z"
    />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function FloatingContact({ className }: { className?: string }) {
  const contactLinks = [
    {
      id: "phone",
      icon: <Phone size={22} fill="currentColor" />,
      href: "tel:0868934576",
      bgColor: "bg-[#4CAF50]",
      hoverColor: "hover:bg-[#43a047]",
      title: "Gọi ngay",
    },
    {
      id: "facebook",
      icon: <FacebookIcon className="w-[22px] h-[22px]" />,
      href: "https://www.facebook.com/Dichvu3DCIC",
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#166fe5]",
      title: "Facebook",
    },
    {
      id: "zalo",
      icon: <ZaloIcon className="w-[22px] h-[22px]" />,
      href: "https://zalo.me/0868934576",
      bgColor: "bg-[#0068FF]",
      hoverColor: "hover:bg-[#005cee]",
      title: "Zalo",
    },
    {
      id: "linkedin",
      icon: <LinkedinIcon className="w-[22px] h-[22px]" />,
      href: "https://www.linkedin.com/company/congtysuamaytinhcic",
      bgColor: "bg-[#0077B5]",
      hoverColor: "hover:bg-[#00669c]",
      title: "LinkedIn",
    },
  ];

  return (
    <div
      className={`fixed bottom-28 right-6 z-[990] flex flex-col gap-3 items-end pointer-events-auto ${className}`}
    >
      {contactLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target={link.id === "phone" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          title={link.title}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 ${link.bgColor} ${link.hoverColor}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
