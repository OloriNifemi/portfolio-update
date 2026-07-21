import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE, PRELOADER } from "../../constants/theme";

const Preloader = ({ onComplete, duration = PRELOADER.defaultDuration }) => {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
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
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.7, ease: EASE }}
          className="fixed inset-0 z-[999] bg-[var(--bg)] flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-center max-w-xl px-8">

            {/* Eyebrow */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.eyebrowDelay, duration: 0.8 }}
              className="uppercase tracking-[0.35em] text-[11px] text-[var(--subtle)]"
            >
              Precious Obafemi
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.headingDelay, duration: 0.9 }}
              className="mt-6 font-serif italic text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[var(--text)]"
            >
              Crafted with
              <br />
              intention.
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: PRELOADER.lineDelay,
                duration: 1,
                ease: EASE,
              }}
              style={{ transformOrigin: "center" }}
              className="mt-8 h-px w-24 bg-[var(--accent)]"
            />

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: PRELOADER.subtitleDelay }}
              className="mt-8 text-[var(--muted)] text-[15px] leading-relaxed max-w-md"
            >
              Every interaction thoughtfully designed.
              <br />
              Every detail intentionally crafted.
            </motion.p>

            {/* Footer */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: PRELOADER.footerDelay }}
              className="mt-12 text-[11px] uppercase tracking-[0.28em] text-[var(--subtle)]"
            >
              Frontend Developer • Lagos, Nigeria
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
