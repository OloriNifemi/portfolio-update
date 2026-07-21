import { useRef } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import ProjectStackCard from "../ui/ProjectStackCard";

import Ecommerce from "../../assets/Ecommerce.png";
import WeddingWeb from "../../assets/WeddingWeb.png";
import Birthday from "../../assets/Birthday.png";

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

const VH_PER_CARD = 120;
const STICKY_TOP_OFFSET = "6rem";

export default function Projects() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative border-t border-[var(--border)]"
    >
      <Container className="pt-28 md:pt-36">
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />
      </Container>

      {prefersReducedMotion ? (
        <div className="mt-20 flex flex-col gap-10 px-4">
          {PROJECTS.map((project, index) => (
            <ProjectStackCard
              key={project.title}
              project={project}
              index={index}
              total={PROJECTS.length}
              scrollYProgress={scrollYProgress}
              staticCard
            />
          ))}
        </div>
      ) : (
        <div
          className="relative mt-20"
          style={{ height: `${PROJECTS.length * VH_PER_CARD}vh` }}
        >
          <div
            className="sticky top-24"
            style={{ height: `calc(100vh - ${STICKY_TOP_OFFSET})`, pointerEvents: 'none' }}
          >
            {PROJECTS.map((project, index) => (
              <ProjectStackCard
                key={project.title}
                project={project}
                index={index}
                total={PROJECTS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 pt-24 pb-36 flex justify-center">
        <HireMeButton />
      </div>
    </section>
  );
}
