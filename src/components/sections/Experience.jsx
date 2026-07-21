import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";

const EXPERIENCE = [
    {
    year: "2025 — Contract Based",
    role: "Executive Assistant / HR",
    place: "Private Client",
    desc: "Managed schedules, priorities, and shifting requirements simultaneously — a habit of staying organized under changing constraints that carries directly into scoping and shipping frontend work.",
  },
  {
    year: "2025 — Contract Based",
    role: "Executive Assistant / HR",
    place: "Private Client",
    desc: "Managed schedules, priorities, and shifting requirements simultaneously — a habit of staying organized under changing constraints that carries directly into scoping and shipping frontend work.",
  },
  {
    
    year: "2024 — Present",
    role: "Frontend Developer",
    place: "Freelance / Contract",
    desc: "Building responsive, production-grade interfaces in React and Tailwind CSS for clients across e-commerce, SaaS, and portfolio projects — from first component to deployment.",
    current: true,
  },
  {
    year: "2026 — Contract Based ",
    role: "Customer Support Representative",
    place: "TuPay",
    desc: "Resolved technical issues for customers in real time, translating confusing problems into clear, calm explanations — the same instinct I now bring to writing interfaces that don't confuse anyone.",
  },
  {
    year: "2025 — Contract Based",
    role: "Executive Assistant / HR",
    place: "Private Client",
    desc: "Managed schedules, priorities, and shifting requirements simultaneously — a habit of staying organized under changing constraints that carries directly into scoping and shipping frontend work.",
  },

];

const Experience = () => {
  return (
    <section id="experience" className="py-28 md:py-36 border-t border-[var(--border)]">
      <Container>
        <SectionHeading eyebrow="Journey" title="Experience." />

        <div className="relative mt-16 pl-8 md:pl-10">
          <div className="absolute left-0 top-1 bottom-1 w-px bg-[var(--border)]" />

          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.role} delay={i * 0.1} className="relative">
                <span
                  className={`absolute -left-8 md:-left-10 top-1.5 w-2.5 h-2.5 rounded-full border ${
                    exp.current ? "bg-[var(--text)] border-[var(--text)]" : "bg-[var(--bg)] border-[var(--text)]"
                  }`}
                  style={{ transform: "translateX(-4px)" }}
                />
                <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--muted)]">{exp.year}</p>
                <h3 className="font-serif text-[24px] text-[var(--text)] mt-2">
                  {exp.role}{" "}
                  <span className="font-sans not-italic text-[13px] text-[var(--muted)] tracking-wide align-middle">
                    — {exp.place}
                  </span>
                </h3>
                <p className="mt-3 max-w-2xl text-[var(--muted)] text-[15px] leading-relaxed">{exp.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;