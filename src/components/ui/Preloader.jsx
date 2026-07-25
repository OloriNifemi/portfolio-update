import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate, useReducedMotion } from "framer-motion";
import { PRELOADER } from "../constants/theme";

// A gentler curve than the site's usual expo-out EASE — smooth accel/decel,
// no sharp snap at the start or end.
const SOFT_EASE = [0.4, 0, 0.2, 1];

const Preloader = ({ onComplete, duration = PRELOADER.defaultDuration }) => {
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
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

    const effectiveDuration = shouldReduceMotion ? PRELOADER.reducedMotionDuration : duration;

    const timer = setTimeout(() => setVisible(false), effectiveDuration);

    // Drives the percentage counter across the same window the preloader
    // is actually visible for, so "100%" and the curtain opening land
    // together rather than the number just being decorative.
    const counter = animate(0, 100, {
      duration: effectiveDuration / 1000,
      ease: "easeOut",
      onUpdate: (v) => setPercent(Math.round(v)),
    });

    return () => {
      clearTimeout(timer);
      counter.stop();
    };
  }, [duration, shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <div className="fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
          {/* Two background panels — these are what split apart on exit,
              revealing the site underneath. */}
          <motion.div
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: SOFT_EASE, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[var(--bg)]"
          />
          <motion.div
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: SOFT_EASE, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[var(--bg)]"
          />

          {/* Content — fades out quickly, ahead of the curtains opening. */}
          <motion.div
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center text-center max-w-xl px-8">
              {/* Eyebrow */}
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: PRELOADER.eyebrowDelay, duration: 1, ease: SOFT_EASE }}
                className="uppercase tracking-[0.35em] text-[11px] text-[var(--subtle)]"
              >
                Portfolio
              </motion.p>

              {/* Name — the actual focal reveal, wiped in left-to-right */}
              <motion.h1
                initial={shouldReduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: PRELOADER.headingDelay, duration: 1.1, ease: SOFT_EASE }}
                className="mt-5 font-serif italic text-4xl sm:text-5xl md:text-6xl text-[var(--text)] tracking-tight"
              >
                Precious Obafemi
              </motion.h1>

              {/* Gold underline — draws in like the hero's corner brackets */}
              <svg width="120" height="6" viewBox="0 0 120 6" className="mt-4">
                <motion.line
                  x1="0"
                  y1="3"
                  x2="120"
                  y2="3"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: PRELOADER.headingDelay + 0.85,
                    duration: 0.7,
                    ease: SOFT_EASE,
                  }}
                />
              </svg>

              {/* Percentage counter + progress line — the "obvious" part */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: PRELOADER.headingDelay + 0.3, duration: 0.8, ease: SOFT_EASE }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <span className="font-serif text-xl text-[var(--text)] tabular-nums">
                  {String(percent).padStart(2, "0")}%
                </span>
                <div className="w-40 h-[2px] rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{
                      width: `${percent}%`,
                      transition: shouldReduceMotion ? "none" : "width 0.1s linear",
                    }}
                  />
                </div>
              </motion.div>

              {/* Footer */}
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: PRELOADER.footerDelay, duration: 1, ease: SOFT_EASE }}
                className="mt-12 text-[11px] uppercase tracking-[0.28em] text-[var(--subtle)]"
              >
                Frontend Developer · Lagos, Nigeria
              </motion.p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;