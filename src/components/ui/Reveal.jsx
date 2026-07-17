import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wrap any block in <Reveal> to fade + rise it in once when it enters the
 * viewport. Respects prefers-reduced-motion automatically.
 *
 * Props:
 *  - delay: stagger multiple Reveals (in seconds)
 *  - y: how far it travels on the way in (px)
 *  - as: which motion element to render ("div" | "span" | ...)
 */
const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;