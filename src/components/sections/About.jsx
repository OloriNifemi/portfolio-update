import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";
import HireMeButton from "../ui/HireMeButton";

const STATS = [
  {
    number: "20+",
    label: "Projects Delivered",
  },
  {
    number: "2+",
    label: "Years Learning & Building",
  },
  {
    number: "100%",
    label: "Commitment to Quality",
  },
];

const TECH = [
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "Git & GitHub",
  "Figma",
];

const HeartbeatLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 32"
      preserveAspectRatio="none"
      className="flex-1 h-6 text-[var(--text)]"
      fill="none"
    >
      <motion.path
        d="M0,16 L14,16 L18,16 L22,4 L26,28 L30,16 L38,16 L44,16 L48,7 L52,24 L56,16 L64,16 L160,16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={inView ? { pathLength: [0, 1] } : { pathLength: 0 }}
        transition={
          inView
            ? { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }
            : { duration: 0.3 }
        }
      />
    </svg>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="py-28 md:py-36 border-t border-[var(--border)]"
    >
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Designing interfaces that feel effortless."
        />

        <div className="grid lg:grid-cols-12 gap-20 mt-20">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.05}>
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[var(--text)]">
                Great interfaces shouldn't compete for attention.
                They should quietly guide users, communicate clearly,
                and leave a lasting impression through simplicity.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[var(--muted)] leading-8 text-[16px]">
                I'm a frontend developer passionate about crafting elegant,
                responsive digital experiences with React, TypeScript and
                Tailwind CSS. I enjoy transforming thoughtful designs into
                products that feel polished, intuitive and refined.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-[var(--muted)] leading-8 text-[16px]">
                Before transitioning fully into development, I worked in
                customer support and executive assistance—experiences that
                sharpened my communication, attention to detail and problem
                solving. Today, those same qualities shape how I build software.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="grid grid-cols-3 gap-10 pt-10 border-t border-[var(--border)]">
                {STATS.map((item) => (
                  <div key={item.label}>
                    <h3 className="font-serif text-4xl text-[var(--text)]">
                      {item.number}
                    </h3>

                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--subtle)] leading-5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <HireMeButton/>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="sticky top-28">
                <p className="uppercase tracking-[0.25em] text-[11px] text-[var(--subtle)] mb-8">
                  Toolbox
                </p>

                <div className="border-y border-[var(--border)] divide-y divide-[var(--border)]">
                  {TECH.map((tech, index) => (
                    <div
                      key={tech}
                      className="flex items-center justify-between py-5 group"
                    >
                      <span className="text-[var(--text)] text-[16px] transition-all duration-300 group-hover:translate-x-2">
                        {tech}
                      </span>

                      <span className="text-[var(--subtle)] font-mono text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Philosophy — pulse trace sits directly opposite the label, inside the box */}
                <div className="rounded-2xl mt-12 p-8 border border-[var(--border)]">
                  <div className="flex items-center gap-4 mb-5">
                    <HeartbeatLine />
                    <p className="uppercase tracking-[0.2em] text-[11px] text-[var(--subtle)] whitespace-nowrap">
                      Philosophy
                    </p>
                  </div>

                  <p className="text-[var(--muted)] leading-7 text-[15px]">
                    I believe digital products should feel timeless,
                    clean layouts, thoughtful interactions and meaningful
                    details that make technology feel human.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;