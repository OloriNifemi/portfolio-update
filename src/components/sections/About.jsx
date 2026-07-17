import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";

const STATS = [
  { num: "3+", label: "Years of Experience" },
  { num: "20+", label: "Projects Completed" },
  { num: "100%", label: "Client Satisfaction" },
];

const TECH = [
  "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
  "Framer Motion", "Vite", "Git & GitHub", "Figma",
];

const About = () => {
  return (
    <section id="about" className="py-28 md:py-36 border-t border-[#EAEAEA]">
      <Container>
        <SectionHeading eyebrow="About" title="A little about my work." />

        <div className="grid lg:grid-cols-12 gap-16 mt-16">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal delay={0.05}>
              <p className="text-[#111111] text-[19px] leading-relaxed font-serif italic">
                I care about the details most people never consciously notice —
                the easing on a hover state, the rhythm of a type scale, the
                half-second that makes an interface feel inevitable rather than
                assembled.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                I specialize in building responsive, high-performance frontends
                with React and Tailwind CSS — turning designs into interfaces
                that feel as good to use as they look. Before focusing fully on
                development, I spent time in customer support at TuPay and as a
                personal assistant, both roles built around clear communication,
                precision, and staying organized under pressure — habits that
                show up directly in how I scope, structure, and ship frontend
                work today.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                Whether it's a marketing site, a product dashboard, or a design
                system, my goal is the same: build something that feels
                intentional in every detail.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex gap-10 mt-6 flex-wrap">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-[28px] text-[#111111]">{s.num}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#666666] mt-1">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#666666] mb-6">
                Technologies I work with
              </p>
              <ul className="flex flex-col divide-y divide-[#EAEAEA] border-t border-b border-[#EAEAEA]">
                {TECH.map((tech, i) => (
                  <li
                    key={tech}
                    className="py-4 flex items-center justify-between text-[#111111] text-[15px]"
                  >
                    <span>{tech}</span>
                    <span className="text-[#666666] text-[12px] font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;