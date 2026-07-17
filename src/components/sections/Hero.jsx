import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

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

          <motion.div {...fadeUp(0.38)} className="mt-12 flex flex-col gap-4">
            <a
              href="#projects"
              className="rounded-lg px-7 py-3.5 max-w-[200px] bg-[#111111] text-white text-[13px] uppercase tracking-[0.1em]
                transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-[#2a2a2a] hover:-translate-y-0.5"
            >
              View Projects → 
            </a>
            <a
              href="#contact"
              className="rounded-lg px-7 py-3.5 max-w-[200px] border border-[#D9D9D8] text-[#111111] text-[13px] uppercase tracking-[0.1em]
                transition-[transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-[#111111] hover:border-[#111111] hover:text-white hover:-translate-y-0.5"
            >
              Contact Meooooo
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-lg px-7 py-3.5 max-w-[200px] text-[#111111] text-[13px] uppercase tracking-[0.1em] flex items-center gap-2
                border border-transparent transition-[border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:border-[#D9D9D8]"
            >
              <HiOutlineArrowDownTray size={15} /> Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.46)} className="mt-14 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
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
          className="relative group"
        >
          {/* Decorative offset frame — drifts a touch further out on hover, for a little depth */}
          <motion.div
            aria-hidden="true"
            variants={{ hover: { x: -6, y: 6 } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute -bottom-5 -left-5 w-full h-full border border-[#111111] pointer-events-none"
          />

          <div className="relative z-10 aspect-[4/5] w-full max-w-sm mx-auto border border-[#EAEAEA] overflow-hidden">
            <motion.div
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative w-full h-full"
            >
              {/* Color layer — always present underneath */}
              <img
                src={portrait}
                alt="Portrait of Precious Obafemi"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
              />
              {/* Grayscale layer on top, fades out on hover to reveal the color layer beneath */}
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