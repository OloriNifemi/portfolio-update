import React from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbBrandGithub } from "react-icons/tb";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";
import Ecommerce from "../../assets/Ecommerce.png";
import WeddingWeb from "../../assets/WeddingWeb.png";
import Birthday from "../../assets/Birthday.png";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 0.6;

const PROJECTS = [
  {
    title: "E-Commerce Storefront",
    image: Ecommerce,
    desc: "A responsive storefront with cart, checkout flow, and product filtering.",
    tags: ["React", "Tailwind CSS", "Context API"],
    liveHref: "https://loc-jewelry-store.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Loc-Jewelry-store.git",
  },
  {
    title: "Wedding Website",
    image: WeddingWeb,
    desc: "Elegant wedding website with RSVP, countdown, and gallery.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveHref: "https://muyiwa-weds-debby.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Wedding-web.git",
  },
  {
    title: "Birthday Card",
    image: Birthday,
    desc: "A reusable design system with accessible components.",
    tags: ["React", "Storybook", "Tailwind CSS"],
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
  },
];

// One shared set of variants, one trigger (the outer card), one timing.
// Everything below fades/lifts/zooms in lockstep instead of racing on
// separate durations and easing curves.
const cardVariants = {
  rest: { y: 0, boxShadow: "0 0px 0px 0px rgba(17,17,17,0)" },
  hover: { y: -6, boxShadow: "0 28px 44px -22px rgba(17,17,17,0.18)" },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const ProjectCard = ({ project, index }) => (
  <Reveal delay={index * 0.1}>
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: DURATION, ease: EASE }}
      className="rounded-lg group border border-[#EAEAEA] transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#111111]"
    >
      {/* Screenshot */}
      <div className="rounded-t-lg relative aspect-[16/10] overflow-hidden border-b border-[#EAEAEA]">
        <motion.img
          src={project.image}
          alt={project.title}
          variants={imageVariants}
          transition={{ duration: DURATION, ease: EASE }}
          className="w-full h-full object-cover"
        />
        <motion.div
          aria-hidden="true"
          variants={overlayVariants}
          transition={{ duration: DURATION, ease: EASE }}
          className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
        />
      </div>

      <div className="p-8 flex flex-col gap-4">
        <h3 className="font-serif text-[22px] text-[#111111]">{project.title}</h3>
        <p className="text-[14px] text-[#666666] leading-relaxed">{project.desc}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wide text-[#666666] border border-[#EAEAEA] px-3 py-1"
            >
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