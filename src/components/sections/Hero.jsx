import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiLinkedin } from "react-icons/tfi";
import { BiLogoGmail } from "react-icons/bi";
import { HiOutlineArrowDown, HiOutlineArrowDownTray } from "react-icons/hi2";
import Container from "../ui/Container";
import portrait from "../../assets/aboutImg.png";
import { EASE, COLORS, IMAGE_ANIMATION, DURATIONS, DELAYS } from "../../constants/theme";
import { fadeUp, scaleFadeIn, drawPath } from "../../utils/motion";
import { SOCIAL_LINKS } from "../../constants/nav";

const GOLD = COLORS.light.accent;


const CORNER_PATHS = {
  tl: "M1,11 L1,1 L11,1",
  tr: "M13,1 L23,1 L23,11",
  bl: "M1,13 L1,23 L11,23",
  br: "M23,13 L23,23 L13,23",
};

const CORNER_POS = {
  tl: "-top-3 -left-3",
  tr: "-top-3 -right-3",
  bl: "-bottom-3 -left-3",
  br: "-bottom-3 -right-3",
};

const CornerBracket = ({ corner, delay, stroke, strokeWidth, shouldReduceMotion }) => (
  <div className={`absolute ${CORNER_POS[corner]} w-6 h-6 pointer-events-none`}>
    <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
      <motion.path
        d={CORNER_PATHS[corner]}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        {...drawPath(delay, shouldReduceMotion)}
      />
    </svg>
  </div>
);

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const portraitVariants = {
    rest: { scale: 1, rotate: 0 },
    hover:{ scale:1.03, rotate:-0.2, },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center py-28 md:py-36 overflow-hidden"
    >
      <Container className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 xl:gap-32 items-center">
        {/* Text */}
        <div>
          <motion.div {...fadeUp(0, shouldReduceMotion)} className="flex flex-col gap-2 mb-10">
            <p className="text-[13px] uppercase tracking-[0.25em] text-[var(--text)]">
              Frontend Developer
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Lagos, Nigeria · Available Worldwide
            </p>
          </motion.div>

          <motion.h1
            {...fadeUp(DELAYS.small, shouldReduceMotion)}
            className="font-serif text-[var(--text)] leading-[1.15] text-[clamp(2.25rem,6vw,4.25rem)]"
          >
            Creating thoughtful
            <br />
            digital experiences
          </motion.h1>

          <motion.p {...fadeUp(DELAYS.normal, shouldReduceMotion)} className="mt-5 text-2xl font-serif italic text-[var(--muted)]">
            — Precious Obafemi
          </motion.p>

          <motion.p
            {...fadeUp(DELAYS.large, shouldReduceMotion)}
            className="mt-10 max-w-lg text-[var(--muted)] text-[17px] leading-relaxed"
          >
            I build elegant, high-performance digital experiences, interfaces
            that feel considered in every detail, from the first pixel to the
            last transition.
          </motion.p>

          <motion.div {...fadeUp(0.38, shouldReduceMotion)} className="mt-12 flex max-sm:flex-col gap-4">
            
            <a  href="#projects"
              className="rounded-full px-7 py-3.5 lg:max-w-[200px] text-center bg-[var(--text)] text-[var(--bg)] text-[13px] uppercase tracking-[0.1em]
                transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:opacity-90 hover:-translate-y-0.5"
            >
              View Projects →
            </a>

            
            <a  href="/resume.pdf"
              download
              className="rounded-full px-7 py-3.5 lg:max-w-[200px] text-center border border-[var(--border)] text-[var(--text)] text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 justify-center
                transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-[var(--text)] hover:border-[var(--text)] hover:text-[var(--bg)] hover:-translate-y-0.5"
            >
              <HiOutlineArrowDownTray size={15} /> Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.46, shouldReduceMotion)} className="mt-14 flex gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.id === 'github' ? PiGithubLogoFill : s.id === 'linkedin' ? TfiLinkedin : BiLogoGmail;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border)] text-[var(--text)]
                    transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:border-[var(--text)] hover:-translate-y-0.5"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          {...scaleFadeIn(shouldReduceMotion)}
          className="relative group"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-black/[0.04] blur-2xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black/[0.08] blur-sm pointer-events-none"
          />

          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-full h-full border border-black/15 pointer-events-none"
          />

          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            style={{ borderColor: GOLD }}
            className="absolute -bottom-3 -left-3 w-[75%] h-[75%] border pointer-events-none"
          />

          <div className="relative z-10 aspect-[4/5] w-full max-w-sm mx-auto">
            {/* Image is clipped separately so corner brackets can overshoot the edge */}
            <div className="absolute inset-0 overflow-hidden border border-[var(--border)]">
              <motion.div
                variants={portraitVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.9, ease: EASE }}
                className="relative w-full h-full"
              >
                <img
                  src={portrait}
                  alt="Portrait of Precious Obafemi"
                  loading="lazy"
                  width={400}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
                />
                <motion.img
                  src={portrait}
                  alt=""
                  aria-hidden="true"
                  variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
                />
              </motion.div>

              <motion.div
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration:1.6, ease:[0.16,1,0.3,1], delay: 0.6,  }}
                style={{ transformOrigin: "left", backgroundColor: GOLD }}
                className="absolute z-20 top-0 left-0 w-full h-px"
              />
              <motion.div
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration:1.6, ease:[0.16,1,0.3,1], delay: 0.6, }}
                style={{ transformOrigin: "top", backgroundColor: GOLD }}
                className="absolute z-20 top-0 left-0 w-px h-full"
              />

              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{
                      duration: IMAGE_ANIMATION.shine.duration,
                      delay: IMAGE_ANIMATION.shine.delay,
                      repeat: Infinity,
                      repeatDelay: IMAGE_ANIMATION.shine.repeatDelay,
                      ease: IMAGE_ANIMATION.shine.ease,
                  }}
                  className="absolute inset-y-0 left-0 z-20 w-1/3 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(75deg, transparent 0%, rgba(184,156,100,0) 35%, rgba(184,156,100,0.28) 50%, rgba(184,156,100,0) 65%, transparent 100%)",
                    mixBlendMode: "soft-light",
                  }}
                />
              )}
            </div>

            {/* Corner marks, gold on tl/br (accent), faint black on tr/bl (structure) */}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
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
