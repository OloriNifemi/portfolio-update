import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss,
  SiRedux,
  SiNodedotjs,
  SiSass,
  SiNpm,
  SiGraphql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
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

const ORBIT_TECH = [
  { id: "react", label: "React", Icon: SiReact, color: "#61DAFB", ring: 0, duration: 16, direction: "normal", angle: 0 },
  { id: "ts", label: "TypeScript", Icon: SiTypescript, color: "#3178C6", ring: 0, duration: 16, direction: "normal", angle: 120 },
  { id: "js", label: "JavaScript", Icon: SiJavascript, color: "#E8C547", ring: 0, duration: 16, direction: "normal", angle: 240 },

  { id: "tailwind", label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", ring: 1, duration: 20, direction: "reverse", angle: 30 },
  { id: "css3", label: "CSS3", Icon: SiCss, color: "#1572B6", ring: 1, duration: 20, direction: "reverse", angle: 150 },
  { id: "html5", label: "HTML5", Icon: SiHtml5, color: "#E34F26", ring: 1, duration: 20, direction: "reverse", angle: 270 },

  { id: "framer", label: "Framer Motion", Icon: SiFramer, color: "#B8A0FF", ring: 2, duration: 26, direction: "normal", angle: 0 },
  { id: "redux", label: "Redux", Icon: SiRedux, color: "#764ABC", ring: 2, duration: 26, direction: "normal", angle: 90 },
  { id: "sass", label: "Sass", Icon: SiSass, color: "#CC6699", ring: 2, duration: 26, direction: "normal", angle: 180 },
  { id: "vite", label: "Vite", Icon: SiVite, color: "#A78BFA", ring: 2, duration: 26, direction: "normal", angle: 270 },

  { id: "git", label: "Git & GitHub", Icon: SiGit, color: "#F05033", ring: 3, duration: 32, direction: "reverse", angle: 45 },
  { id: "node", label: "Node.js", Icon: SiNodedotjs, color: "#339933", ring: 3, duration: 32, direction: "reverse", angle: 165 },
  { id: "npm", label: "npm", Icon: SiNpm, color: "#CB3837", ring: 3, duration: 32, direction: "reverse", angle: 285 },

  { id: "figma", label: "Figma", Icon: SiFigma, color: "#F24E1E", ring: 4, duration: 38, direction: "normal", angle: 0 },
  { id: "vscode", label: "VS Code", Icon: VscVscode, color: "#007ACC", ring: 4, duration: 38, direction: "normal", angle: 120 },
  { id: "graphql", label: "GraphQL", Icon: SiGraphql, color: "#E10098", ring: 4, duration: 38, direction: "normal", angle: 240 },
];

const RING_RADIUS = [42, 72, 102, 132, 162]; // px, index matches `ring` above
const CLUSTER_SIZE = RING_RADIUS[RING_RADIUS.length - 1] * 2 + 44; // room for node + label

const OrbitNode = ({ tech, shouldReduceMotion }) => {
  const radius = RING_RADIUS[tech.ring];
  const ringRef = useRef(null);
  const innerRef = useRef(null);

  const pause = () => {
    if (shouldReduceMotion) return;
    if (ringRef.current) ringRef.current.style.animationPlayState = "paused";
    if (innerRef.current) innerRef.current.style.animationPlayState = "paused";
  };

  const resume = () => {
    if (shouldReduceMotion) return;
    if (ringRef.current) ringRef.current.style.animationPlayState = "running";
    if (innerRef.current) innerRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      ref={ringRef}
      className="absolute inset-0"
      style={
        shouldReduceMotion
          ? { transform: `rotate(${tech.angle}deg)` }
          : {
              animation: `orbit-spin ${tech.duration}s linear infinite ${tech.direction}`,
              transform: `rotate(${tech.angle}deg)`,
            }
      }
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: `translate(-50%, -50%) translateY(-${radius}px)` }}
      >
        <div
          ref={innerRef}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  animation: `orbit-spin ${tech.duration}s linear infinite ${
                    tech.direction === "reverse" ? "normal" : "reverse"
                  }`,
                }
          }
        >
          <div
            role="group"
            aria-label={tech.label}
            tabIndex={0}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
            className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--bg)] transition-transform duration-300 hover:scale-110 focus:scale-110 outline-none"
            style={{ border: `1px solid ${tech.color}55` }}
          >
            <tech.Icon size={16} style={{ color: tech.color }} aria-hidden="true" />
            <span
              className="pointer-events-none absolute top-[42px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-[var(--text)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100"
            >
              {tech.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrbitCluster = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto"
      style={{ width: CLUSTER_SIZE, height: CLUSTER_SIZE, maxWidth: "100%" }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
      {ORBIT_TECH.map((tech) => (
        <OrbitNode key={tech.id} tech={tech} shouldReduceMotion={shouldReduceMotion} />
      ))}
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const HeartbeatLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

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
        animate={inView && !shouldReduceMotion ? { pathLength: [0, 1] } : { pathLength: 0 }}
        transition={
          inView && !shouldReduceMotion
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
                <p className="uppercase tracking-[0.25em] text-[11px] text-[var(--subtle)] mb-8 text-center">
                  Tools in orbit
                </p>

                <OrbitCluster />

                {/* Philosophy — pulse trace sits directly opposite the label, inside the box */}
                <div className="rounded-2xl mt-12 p-8 border border-[var(--border)]">
                  <div className="flex items-center gap-4 mb-5">
                    <HeartbeatLine />
                    <p className="uppercase tracking-[0.2em] text-[11px] text-[var(--subtle)] whitespace-nowrap">
                      My Philosophy
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