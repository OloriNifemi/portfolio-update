import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowUp } from "react-icons/hi2";
import { scrollToTopSmooth } from "../utils/scroll";

const EASE = [0.16, 1, 0.3, 1];

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    scrollToTopSmooth({ duration: 700 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.9 }}
          transition={{
            duration: 0.45,
            ease: EASE,
          }}
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-12
            h-12
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--text)]
            shadow-lg
            backdrop-blur-md
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[var(--text)]
            hover:bg-[var(--text)]
            hover:text-[var(--bg)]
            active:scale-95
          "
        >
          <HiOutlineArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}