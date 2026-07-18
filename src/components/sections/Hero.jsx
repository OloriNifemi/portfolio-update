import React, { useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiLinkedin } from "react-icons/tfi";
import { BiLogoGmail } from "react-icons/bi";
import { HiOutlineArrowDown, HiOutlineArrowDownTray } from "react-icons/hi2";
import Container from "../ui/Container";
import portrait from "../../assets/aboutImg.png";

const SOCIALS = [
  { icon: <PiGithubLogoFill />, href: "https://github.com/OloriNifemi", label: "GitHub" },
  { icon: <TfiLinkedin />, href: "https://www.linkedin.com/in/obafemi-ayomipo", label: "LinkedIn" },
  { icon: <BiLogoGmail />, href: "mailto:ayomipoobafemi@gmail.com", label: "Email" },
];

const EASE = [0.16, 1, 0.3, 1];
const GOLD = "#B89C64";

// Corner bracket geometry, in a 24x24 box, arm length ~10px, 1px inset for a
// crisp stroke. Each is one continuous path so it "draws" as a single line.
const CORNER_CONFIG = {
  tl: { pos: "-top-3 -left-3", path: "M1,11 L1,1 L11,1", hover: { x: -4, y: -4 } },
  tr: { pos: "-top-3 -right-3", path: "M13,1 L23,1 L23,11", hover: { x: 4, y: -4 } },
  bl: { pos: "-bottom-3 -left-3", path: "M1,13 L1,23 L11,23", hover: { x: -4, y: 4 } },
  br: { pos: "-bottom-3 -right-3", path: "M23,13 L23,23 L13,23", hover: { x: 4, y: 4 } },
};

const CornerBracket = ({ corner, delay, stroke, strokeWidth, shouldReduceMotion }) => {
  const { pos, path, hover } = CORNER_CONFIG[corner];

  return (
    <motion.div
      variants={{ hover }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`absolute ${pos} w-6 h-6 pointer-events-none`}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0.9, 1], opacity: 1, }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const outerX = useMotionValue(0);
  const outerY = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springOuterX = useSpring(outerX, { stiffness: 90, damping: 22, mass: 0.7 });
  const springOuterY = useSpring(outerY, { stiffness: 90, damping: 22, mass: 0.7 });
  const springInnerX = useSpring(innerX, { stiffness: 220, damping: 20, mass: 0.4 });
  const springInnerY = useSpring(innerY, { stiffness: 220, damping: 20, mass: 0.4 });

  const handlePortraitMouseMove = useCallback(
    (e) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      outerX.set(relX * 8);
      outerY.set(relY * 8);
      innerX.set(relX * -6); // opposite direction from the outer frame
      innerY.set(relY * -6);
    },
    [shouldReduceMotion, outerX, outerY, innerX, innerY]
  );

  const handlePortraitMouseLeave = useCallback(() => {
    outerX.set(0);
    outerY.set(0);
    innerX.set(0);
    innerY.set(0);
  }, [outerX, outerY, innerX, innerY]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center py-28 md:py-36 overflow-hidden"
    >
      <Container className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 xl:gap-32 items-center">
        {/* Text */}
        <div>
          <motion.div {...fadeUp(0)} className="flex flex-col gap-2 mb-10">
            <p className="text-[13px] uppercase tracking-[0.25em] text-[#111111]">
              Frontend Developer
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-[#666666]">
              Lagos, Nigeria · Available Worldwide
            </p>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-[#111111] leading-[1.15] text-[clamp(2.25rem,6vw,4.25rem)]"
          >
            Creating thoughtful
            <br />
            digital experiences
          </motion.h1>

          <motion.p {...fadeUp(0.18)} className="mt-5 text-2xl font-serif italic text-[#666666]">
            — Precious Obafemi
          </motion.p>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-10 max-w-lg text-[#666666] text-[17px] leading-relaxed"
          >
            I build elegant, high-performance digital experiences — interfaces
            that feel considered in every detail, from the first pixel to the
            last transition.
          </motion.p>

          <motion.div {...fadeUp(0.38)} className="mt-12 flex  gap-4">
            
            <a  href="#projects"
              className="rounded-lg px-7 py-3.5 lg:max-w-[200px] text-center bg-[#111111] text-white text-[13px] uppercase tracking-[0.1em]
                transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-[#2a2a2a] hover:-translate-y-0.5"
            >
              View Projects →
            </a>
            
            <a  href="/resume.pdf"
              download
              className="rounded-lg px-7 py-3.5 lg:max-w-[200px] text-center  border border-[#D9D9D8] text-[#111111] text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 justify-center
                transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-[#111111] hover:border-[#111111] hover:text-white hover:-translate-y-0.5"
            >
              <HiOutlineArrowDownTray size={15} /> Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.46)} className="mt-14 flex gap-3">
            {SOCIALS.map((s) => (
              
              <a  key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#EAEAEA] text-[#111111]
                  transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:border-[#111111] hover:-translate-y-0.5"
              >
                {React.cloneElement(s.icon, { size: 17 })}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          whileHover={shouldReduceMotion ? undefined : "hover"}
          onMouseMove={handlePortraitMouseMove}
          onMouseLeave={handlePortraitMouseLeave}
          className="relative group"
        >
          {/* Soft floating shadow — sits under everything, barely moves */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="absolute inset-0 translate-x-3 translate-y-3 bg-black/5 blur-md pointer-events-none"
          />

          {/* Outer offset frame — ambient float (11s) + mouse parallax, faint black */}
          <motion.div
            aria-hidden="true"
            animate={
            shouldReduceMotion ? {} : { x: [0, 8, -6, 0], y: [0, -8, 5, 0], }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-full h-full pointer-events-none"
          >
            <motion.div
              style={{ x: springOuterX, y: springOuterY }}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="w-full h-full border border-[#111111]/10"
            />
          </motion.div>

          {/* Inner offset frame — ambient float (8s), opposite phase, gold hairline */}
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? {} : { x: [0, -6, 4, 0], y: [0, 6, -4, 0], }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 -left-3 w-full h-full pointer-events-none"
          >
            <motion.div
              style={{
                x: springInnerX,
                y: springInnerY,
                borderColor: GOLD,
              }}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="w-full h-full border"
            />
          </motion.div>

          <div className="relative z-10 aspect-[4/5] w-full max-w-sm mx-auto">
            {/* Image — clipped separately so corner brackets can overshoot the edge */}
            <div className="absolute inset-0 overflow-hidden border border-[#EAEAEA]">
              <motion.div
                variants={{ hover: { scale: 1.06, rotate: -0.4, }, }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative w-full h-full"
              >
                <img
                  src={portrait}
                  alt="Portrait of Precious Obafemi"
                  className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
                />
                <motion.img
                  src={portrait}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 1 }}
                  variants={{ hover: { opacity: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
                />
              </motion.div>

              {/* Self-drawing gold accent — top + left edge only. Draws in on
                  load, overshoots a few px on hover. This is the single
                  restrained luxury detail; everything else stays quiet. */}
              <motion.div
                aria-hidden="true"
                variants={{ hover: { scaleX: 1.08 } }}
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  scaleX: shouldReduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.6, ease: EASE },
                }}
                style={{ transformOrigin: "left" }}
                className="absolute z-20 top-0 left-0 w-full h-px bg-[#B89C64]"
              />
              <motion.div
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                whileHover={ shouldReduceMotion ? undefined : { scaleX: 1.08, }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: EASE,
                }}
                style={{ transformOrigin: "top" }}
                className="absolute z-20 top-0 left-0 w-px h-full bg-[#B89C64]"
              />
            </div>

            {/* Corner marks — gold on tl/br (accent), faint black on tr/bl (structure) */}
            <CornerBracket corner="tl" delay={0.9} stroke={GOLD} strokeWidth="1.5" shouldReduceMotion={shouldReduceMotion} />
            <CornerBracket corner="tr" delay={1.0} stroke="#111111" strokeWidth="1" shouldReduceMotion={shouldReduceMotion} />
            <CornerBracket corner="bl" delay={1.0} stroke="#111111" strokeWidth="1" shouldReduceMotion={shouldReduceMotion} />
            <CornerBracket corner="br" delay={1.1} stroke={GOLD} strokeWidth="1.5" shouldReduceMotion={shouldReduceMotion} />
          </div>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666666]"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default Hero;