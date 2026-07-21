import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiCss,
  SiFramer,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglechrome,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Tools/tech with a recognizable mark of their own. Process-only skills
// (Pull Requests, Code Review, Responsive Design) don't have a logo, so
// they're left out of this icon grid.
const APP_ICONS = [
  { label: "JavaScript", icon: SiJavascript, bg: "#F0DB4F", fg: "#1A1A1A" },
  { label: "TypeScript", icon: SiTypescript, bg: "#3178C6", fg: "#FFFFFF" },
  { label: "React", icon: SiReact, bg: "#20232A", fg: "#61DAFB" },
  { label: "Vite", icon: SiVite, bg: "#7C3AED", fg: "#FFFFFF" },
  { label: "Tailwind", icon: SiTailwindcss, bg: "#0EA5E9", fg: "#FFFFFF" },
  { label: "CSS3", icon: SiCss, bg: "#2965F1", fg: "#FFFFFF" },
  { label: "Framer", icon: SiFramer, bg: "#B89C64", fg: "#FFFFFF" },
  { label: "Figma", icon: SiFigma, bg: "#2C2C2C", fg: "#F24E1E" },
  { label: "Git", icon: SiGit, bg: "#F05033", fg: "#FFFFFF" },
  { label: "GitHub", icon: SiGithub, bg: "#181717", fg: "#FFFFFF" },
  { label: "VS Code", icon: VscVscode, bg: "#007ACC", fg: "#FFFFFF" },
  { label: "DevTools", icon: SiGooglechrome, bg: "#4285F4", fg: "#FFFFFF" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 md:py-36 border-t border-[var(--border)]">
      <Container>
        <SectionHeading eyebrow="Capabilities" title="Skills & tools." />

        {/* App-icon style grid: flat, colorful, enhanced animations */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10 mt-16">
          {APP_ICONS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Reveal key={tool.label} delay={i * 0.03} className="flex flex-col items-center gap-2.5 group">
                <div
                  className="relative overflow-hidden w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-[18px] flex items-center justify-center transition-all duration-300 group-hover:animate-skill-pulse"
                  style={{
                    backgroundColor: tool.bg,
                    color: tool.fg,
                    animation: `skillPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <Icon size={26} className="sm:hidden group-hover:animate-icon-bounce" />
                  <Icon size={30} className="hidden sm:block lg:hidden group-hover:animate-icon-bounce" />
                  <Icon size={36} className="hidden lg:block group-hover:animate-icon-bounce" />
                  <div
                    aria-hidden="true"
                    className="absolute -inset-y-2 -left-1/2 w-[200%] animate-shimmer-sweep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(75deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
                      mixBlendMode: "soft-light",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-[var(--muted)] text-center leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                  {tool.label}
                </span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Skills;
