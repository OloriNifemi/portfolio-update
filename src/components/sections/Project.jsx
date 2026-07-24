import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence, motion } from "framer-motion";

import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import ProjectStackCard from "../ui/ProjectStackCard";

import Ecommerce from "../../assets/Ecommerce.png";
import WeddingWeb from "../../assets/WeddingWeb.png";
import Birthday from "../../assets/Birthday.png";

const EASE = [0.16, 1, 0.3, 1];

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
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Only recompute + re-render when the active project actually changes —
  // not on every scroll pixel. This replaces the old continuous per-frame
  // transform interpolation across 3 permanently-mounted, overlapping cards.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PROJECTS.length - 1, Math.floor(v * PROJECTS.length));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
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
            />
          ))}
        </div>
      ) : (
        <div
          className="relative mt-20"
          style={{ height: `${PROJECTS.length * VH_PER_CARD}vh` }}
        >
          <div
            className="sticky top-24 flex items-center justify-center px-4 sm:px-6"
            style={{ height: `calc(100vh - ${STICKY_TOP_OFFSET})` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -28, scale: 0.97 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full flex items-center justify-center"
              >
                <ProjectStackCard
                  project={PROJECTS[activeIndex]}
                  index={activeIndex}
                  total={PROJECTS.length}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-24 pb-36 flex justify-center">
        <HireMeButton />
      </div>
    </section>
  );
}