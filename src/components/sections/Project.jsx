import React from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbBrandGithub } from "react-icons/tb";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";
import Ecommerce from "../../assets/Ecommerce.png"
import WeddingWeb from "../../assets/WeddingWeb.png"
import Birthday from "../../assets/Birthday.png"


const PROJECTS = [
  {
    title: "E-Commerce Storefront",
    image: Ecommerce,
    desc:
      "A responsive storefront with cart, checkout flow, and product filtering.",
    tags: ["React", "Tailwind CSS", "Context API"],
    liveHref: "https://loc-jewelry-store.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Loc-Jewelry-store.git",
  },
  {
    title: "Wedding Website",
    image: WeddingWeb,
    desc:
      "An elegant wedding website with RSVP, countdown timer, gallery and animations.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveHref: "https://muyiwa-weds-debby.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Wedding-web.git",
  },
  {
    title: "Birthday Card",
    image: Birthday,
    desc:
      "A reusable design system with accessible components.",
    tags: ["React", "Storybook", "Tailwind CSS"],
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
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#EAEAEA]">

        <motion.img
          src={project.image}
          alt={project.title}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

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