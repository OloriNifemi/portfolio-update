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

        {/* App-icon style grid: flat, colorful, no grouping borders, gentle float */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10 mt-16">
          {APP_ICONS.map((tool, i) => {
            const Icon = tool.icon;
            return (

              <Reveal key={tool.label} delay={i * 0.03} className="flex flex-col items-center gap-2.5">
                <div
                
                  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-[18px] flex items-center justify-center animate-wiggle"
                  style={{
                    backgroundColor: tool.bg,
                    color: tool.fg,
                    animationDelay: `${(i * (3.8 / APP_ICONS.length)).toFixed(2)}s`,
                  }}
                >
                  <Icon size={26} className="sm:hidden" />
                  <Icon size={30} className="hidden sm:block lg:hidden" />
                  <Icon size={36} className="hidden lg:block" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-[var(--muted)] text-center leading-tight">
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