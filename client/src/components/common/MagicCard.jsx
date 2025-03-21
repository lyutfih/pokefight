"use client";
import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "../../utils/themeUtils";

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex size-full text-base py-6 px-8 overflow-hidden rounded-lg shadow-2xl bg-neutral-100 dark:bg-indigo-300/5 text-black dark:text-white",
        className
      )}
    >
      <div className="relative z-10 flex flex-col justify-center items-center gap-4">
        {children}
      </div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}
