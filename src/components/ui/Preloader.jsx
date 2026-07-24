import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRELOADER } from "../constants/theme";

// A gentler curve than the site's usual expo-out EASE — smooth accel/decel,
// no sharp snap at the start or end.
const SOFT_EASE = [0.4, 0, 0.2, 1];

const Preloader = ({ onComplete, duration = PRELOADER.defaultDuration }) => {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Ensure dark mode class is applied from localStorage on preloader load
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const timer = setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? PRELOADER.reducedMotionDuration : duration
    );

    return () => clearTimeout(timer);
  }, [duration, shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 1.4, ease: SOFT_EASE }}
          className="fixed inset-0 z-[999] bg-[var(--bg)] flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-center max-w-xl px-8">

            {/* Eyebrow */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.eyebrowDelay, duration: 1, ease: SOFT_EASE }}
              className="uppercase tracking-[0.35em] text-[11px] text-[var(--subtle)]"
            >
              Precious Obafemi
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.headingDelay, duration: 1.1, ease: SOFT_EASE }}
              className="mt-6 font-serif italic text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[var(--text)]"
            >
              匠心
              <br />
              雕琢。
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: PRELOADER.lineDelay,
                duration: 1.2,
                ease: SOFT_EASE,
              }}
              style={{ transformOrigin: "center" }}
              className="mt-8 h-px w-24 bg-[var(--accent)]"
            />

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.subtitleDelay, duration: 1, ease: SOFT_EASE }}
              className="mt-8 text-[var(--muted)] text-[15px] leading-relaxed max-w-md"
            >
              每一次互动，皆用心设计。
              <br />
              每一个细节，皆匠心雕琢。
            </motion.p>

            {/* Footer */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.footerDelay, duration: 1, ease: SOFT_EASE }}
              className="mt-12 text-[11px] uppercase tracking-[0.28em] text-[var(--subtle)]"
            >
              前端开发工程师 · 尼日利亚拉各斯
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;