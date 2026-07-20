import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const Preloader = ({ onComplete, duration = 3500 }) => {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? 900 : duration
    );

    return () => clearTimeout(timer);
  }, [duration, shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
           exit={{ y: "-100%" }} transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], }}
          className="fixed inset-0 z-[999] bg-white flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-center max-w-xl px-8">

            {/* Eyebrow */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="uppercase tracking-[0.35em] text-[11px] text-[#777]"
            >
              Precious Obafemi
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-6 font-serif italic text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[#111]"
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
                delay: 0.8,
                duration: 1,
                ease: EASE,
              }}
              style={{ transformOrigin: "center" }}
              className="mt-8 h-px w-24 bg-[#B89C64]"
            />

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-[#666] text-[15px] leading-relaxed max-w-md"
            >
              Every interaction thoughtfully designed.
              <br />
              Every detail intentionally crafted.
            </motion.p>

            {/* Footer */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
              className="mt-12 text-[11px] uppercase tracking-[0.28em] text-[#999]"
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