"use client";

import React, { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TocSidebar({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <nav className="space-y-1">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block py-1.5 text-sm transition-colors duration-200 ${
            item.level === 3 ? "ml-4" : "font-medium"
          } ${
            activeId === item.id
              ? "text-accent font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(item.id);
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 100, // Offset
                behavior: "smooth",
              });
            }
          }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
