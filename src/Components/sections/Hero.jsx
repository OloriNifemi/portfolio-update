import React from "react";
import { motion, useReducedMotion} from "framer-motion";
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});


const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      <Container className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        {/* Text */}
        <div>
          <motion.p {...fadeUp(0)} className="text-[13px] uppercase tracking-[0.25em] text-[#666666] mb-6">
            Frontend Developer
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif text-[#111111] leading-[1.05] text-[13vw] sm:text-[8vw] lg:text-[4.2vw]"
          >
            Precious <em className="italic">Obafemi</em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-8 max-w-lg text-[#666666] text-[17px] leading-relaxed"
          >
            I build elegant, high-performance digital experiences — interfaces that
            feel considered in every detail, from the first pixel to the last
            transition.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap gap-4 ">
            <a
              href="#projects"
              className="rounded-lg px-7 py-3.5 bg-[#111111] text-white text-[13px] uppercase tracking-[0.1em]
                transition-all duration-300 hover:bg-black hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className=" rounded-lg px-7 py-3.5 border border-[#787877] text-[#111111] text-[13px] uppercase tracking-[0.1em]
                transition-all duration-500 hover:bg-[#111111] hover:text-white hover:-translate-y-0.5"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="rounded-lg px-7 py-3.5 text-[#111111] text-[13px] uppercase tracking-[0.1em] flex items-center gap-2
                border border-transparent transition-all duration-300 hover:border-[#787877]"
            >
              <HiOutlineArrowDownTray size={15} /> Resume
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-12 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex items-center justify-center w-11 h-11 border border-[#EAEAEA] text-[#111111]
                  transition-all duration-300 hover:border-[#111111] hover:-translate-y-0.5"
              >
                {React.cloneElement(s.icon, { size: 17 })}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={shouldReduceMotion ? undefined : "hover"}
          className="relative group"
        >
          {/* Decorative offset frame — drifts a touch further out on hover, for a little depth */}
          <motion.div
            aria-hidden="true"
            variants={{ hover: { x: -8, y: 8 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-5 -left-5 w-full h-full border border-[#111111]"
          />

          <div className="relative z-10 aspect-[4/5] w-full max-w-sm mx-auto border border-[#EAEAEA] overflow-hidden">
            <motion.img
              src={portrait}
              alt="Portrait of Precious Obafemi"
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
        </motion.div>
      </Container>
      
      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666666]"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineArrowDown size={14} />
        </motion.span>
      </a>
    </section>
  );
};

export default Hero;