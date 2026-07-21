import { motion } from "framer-motion";

const HireMeButton = () => {
  return (
    <motion.a
      href="#contact"
      whileHover={{
        y: -2,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="hire-btn inline-flex items-center justify-center px-7 py-3.5 rounded-full uppercase tracking-[0.1em] text-[13px]"
    >
      Hire Me!
    </motion.a>
  );
};

export default HireMeButton;