import React from "react";
import { TbCode, TbDeviceMobile, TbBrandReact, TbLayoutGrid } from "react-icons/tb";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";

const SERVICES = [
  { icon: <TbCode />, title: "Frontend Development", desc: "Clean, maintainable code architected to scale with the product, not just the demo." },
  { icon: <TbDeviceMobile />, title: "Responsive Websites", desc: "Interfaces that hold together at every breakpoint — not just the ones tested in the handoff." },
  { icon: <TbBrandReact />, title: "React Applications", desc: "Component-driven builds with sensible state management and a performance budget in mind." },
  { icon: <TbLayoutGrid />, title: "UI Implementation", desc: "Turning a design file into pixel-accurate, accessible, production-ready markup." },
];

const Services = () => {
  return (
    <section id="services" className="py-28 md:py-36 border-t border-[#EAEAEA]">
      <Container>
        <SectionHeading eyebrow="What I Offer" title="Services." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="text-[26px] text-[#111111] mb-6">{s.icon}</div>
              <h3 className="font-serif text-[19px] text-[#111111] mb-3">{s.title}</h3>
              <p className="text-[14px] text-[#666666] leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;