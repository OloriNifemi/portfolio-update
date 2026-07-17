import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";

const CATEGORIES = [
  { title: "Frontend", items: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js"] },
  { title: "Styling", items: ["Tailwind CSS", "CSS3 / Sass", "Framer Motion", "Responsive Design"] },
  { title: "Tools", items: ["Vite", "Figma", "VS Code", "Chrome DevTools"] },
  { title: "Version Control", items: ["Git", "GitHub", "Pull Requests", "Code Review"] },
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 md:py-36 border-t border-[#EAEAEA]">
      <Container>
        <SectionHeading eyebrow="Capabilities" title="Skills & tools." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#EAEAEA] mt-16 border border-[#EAEAEA]">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08} className="bg-white p-8 flex flex-col gap-5">
              <h3 className="text-[12px] uppercase tracking-[0.2em] text-[#666666]">{cat.title}</h3>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <li key={item} className="text-[#111111] text-[15px] font-serif italic">
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