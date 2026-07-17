import React from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbBrandGithub } from "react-icons/tb";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

/*
  NOTE: swap `image` for real project screenshots (import them like the
  hero portrait) once you have them. The monogram placeholder keeps the
  layout shippable without screenshots on hand.
*/
const PROJECTS = [
  {
    title: "E-Commerce Storefront",
    desc: "A responsive storefront with cart, checkout flow, and product filtering, built with performance as a first-class requirement.",
    tags: ["React", "Tailwind CSS", "Context API"],
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
  },
  {
    title: "Task Management App",
    desc: "A drag-and-drop kanban board with persistent state, keyboard accessibility, and multi-board support.",
    tags: ["React", "TypeScript", "Framer Motion"],
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
  },
  {
    title: "Design System & Component Library",
    desc: "A themeable, documented component library used across multiple client projects to keep shipping fast and consistent.",
    tags: ["React", "Tailwind CSS", "Storybook"],
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
  },
];

const ProjectCard = ({ project, index }) => (
  <Reveal delay={index * 0.1}>
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[#EAEAEA] transition-colors duration-300 hover:border-[#111111]"
    >
      {/* Screenshot placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAFAFA] border-b border-[#EAEAEA]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif italic text-5xl text-[#111111]/10 transition-colors duration-500 group-hover:text-[#111111]/20">
            {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <h3 className="font-serif text-[22px] text-[#111111]">{project.title}</h3>
        <p className="text-[14px] text-[#666666] leading-relaxed">{project.desc}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] uppercase tracking-wide text-[#666666] border border-[#EAEAEA] px-3 py-1">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6 pt-4 mt-2 border-t border-[#EAEAEA]">
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] text-[#111111] transition-colors duration-300 hover:text-[#666666]"
          >
            Live Demo <HiOutlineArrowUpRight size={14} />
          </a>
          <a
            href={project.codeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] text-[#111111] transition-colors duration-300 hover:text-[#666666]"
          >
            <TbBrandGithub size={15} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  </Reveal>
);

const Projects = () => {
  return (
    <section id="projects" className="py-28 md:py-36 border-t border-[#EAEAEA]">
      <Container>
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;