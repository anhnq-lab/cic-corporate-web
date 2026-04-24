"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      // Show only after scrolling a bit
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent"
      style={{ scaleX, originX: 0 }}
    >
      <div className="h-full bg-gradient-to-r from-accent via-orange-400 to-amber-500" />
    </motion.div>
  );
}
