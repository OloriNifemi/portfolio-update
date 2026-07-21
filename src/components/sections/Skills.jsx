import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";

const CATEGORIES = [
  { title: "Frontend", items: ["JavaScript (ES6+)", "TypeScript", "React", "Vite", ], rounded: "rounded-l-2xl"},
  { title: "Styling", items: ["Tailwind CSS", "CSS3", "Framer Motion", "Responsive Design"] },
  { title: "Tools", items: ["Vite", "Figma", "VS Code", "Chrome DevTools"] },
  { title: "Version Control", items: ["Git", "GitHub", "Pull Requests", "Code Review"], rounded: "rounded-r-2xl"},
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 md:py-36 border-t border-[var(--border)] ">
      <Container>
        <SectionHeading eyebrow="Capabilities" title="Skills & tools." />

        <div className="rounded-2xl  grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] mt-16 border border-[var(--border)]">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08} className={`${cat.rounded} bg-[var(--bg)] p-8 flex flex-col gap-5`}>
              <h3 className="text-[12px] uppercase tracking-[0.2em] text-[var(--muted)]">{cat.title}</h3>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <li key={item} className="text-[var(--text)] text-[15px] font-serif italic">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Skills;