import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useReducedMotion } from "framer-motion";

import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import ProjectSlider from "../ui/ProjectSlider";

import Ecommerce from "../../assets/Ecommerce.png";
import WeddingWeb from "../../assets/WeddingWeb.png";
import Birthday from "../../assets/Birthday.png";

const RAW_PROJECTS = [
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
    liveHref: "https://olawalee-birthday-card-roan.vercel.app/",
    codeHref: "https://github.com/OloriNifemi",
  },
];

const PROJECTS = RAW_PROJECTS.map((p, i) => ({ ...p, originalIndex: i }));

const AUTOPLAY_INTERVAL_MS = 1000;
const INTERACTION_PAUSE_MS = 6000; // how long a manual action holds off autoplay

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const total = PROJECTS.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTempPaused, setIsTempPaused] = useState(false);
  const resumeTimer = useRef(null);

  const paused = isHovered || isTempPaused || prefersReducedMotion;

  const goToIndex = useCallback((idx) => {
    setCurrentIndex(((idx % total) + total) % total);
  }, [total]);

  const goToDelta = useCallback((delta) => {
    setCurrentIndex((prev) => ((prev + delta) % total + total) % total);
  }, [total]);

  const pauseTemporarily = useCallback(() => {
    setIsTempPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsTempPaused(false), INTERACTION_PAUSE_MS);
  }, []);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const handlePrev = useCallback(() => {
    pauseTemporarily();
    goToDelta(-1);
  }, [pauseTemporarily, goToDelta]);

  const handleNext = useCallback(() => {
    pauseTemporarily();
    goToDelta(1);
  }, [pauseTemporarily, goToDelta]);

  const handleDot = useCallback(
    (idx) => {
      pauseTemporarily();
      goToIndex(idx);
    },
    [pauseTemporarily, goToIndex]
  );

  const handleSliderIndexChange = useCallback(
    (idx) => {
      pauseTemporarily();
      goToIndex(idx);
    },
    [pauseTemporarily, goToIndex]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section id="projects" className="relative border-t border-[var(--border)] overflow-x-hidden">
      <Container className="pt-28 md:pt-36 pb-20 md:pb-28">
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />

        <div
          className="relative mt-16 overflow-hidden overscroll-x-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            type="button"
            aria-label="Previous project"
            onClick={handlePrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[var(--border)] items-center justify-center text-[var(--text)] bg-[var(--bg)] hover:border-[var(--text)] transition-colors"
          >
            <HiOutlineChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={handleNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[var(--border)] items-center justify-center text-[var(--text)] bg-[var(--bg)] hover:border-[var(--text)] transition-colors"
          >
            <HiOutlineChevronRight size={18} />
          </button>

          <div className="relative h-[610px] sm:h-[580px] md:h-[560px] lg:h-[580px]" style={{ overflow: "clip" }}>
            <ProjectSlider
              projects={PROJECTS}
              currentIndex={currentIndex}
              onIndexChange={handleSliderIndexChange}
              onInteraction={pauseTemporarily}
              isReduced={prefersReducedMotion}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-7">
          {PROJECTS.map((project) => {
            const isActive = project.originalIndex === currentIndex;
            return (
              <button
                key={project.title}
                type="button"
                aria-label={`Go to ${project.title}`}
                aria-current={isActive}
                onClick={() => handleDot(project.originalIndex)}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "28px" : "12px",
                  backgroundColor: isActive ? "var(--text)" : "var(--border)",
                }}
              />
            );
          })}
        </div>
      </Container>

      <div className="relative z-10 pt-10 pb-10 flex justify-center">
        <HireMeButton />
      </div>
    </section>
  );
}