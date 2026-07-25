import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import SwipeCard from "../ui/SwipeCard";

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
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
  },
];

// Tag each project with a stable index up front so it survives reordering
// in the stack (used for the "01 / 03" counter inside the card).
const PROJECTS = RAW_PROJECTS.map((p, i) => ({ ...p, originalIndex: i }));

const VISIBLE_DEPTH = 3; // how many cards deep the stack renders at once
const ANIMATION_LOCK_MS = 380; // matches SwipeCard's exit duration

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const total = PROJECTS.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef(new Map());
  const lockTimer = useRef(null);

  // "left" = current card exits left, deck advances forward.
  // "right" = current card exits right, deck steps back.
  const advance = useCallback(
    (direction) => {
      setCurrentIndex((prev) =>
        direction === "left" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [total]
  );

  const onSwiped = useCallback((direction) => advance(direction), [advance]);

  // Fires the real drag-exit animation programmatically, so buttons and
  // keyboard shortcuts feel identical to an actual swipe.
  const triggerTop = useCallback(
    (direction) => {
      if (isAnimating) return;
      const topProject = PROJECTS[currentIndex];
      const topCard = cardRefs.current.get(topProject.title);
      if (!topCard) return;

      setIsAnimating(true);
      topCard.trigger(direction);

      clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(
        () => setIsAnimating(false),
        prefersReducedMotion ? 0 : ANIMATION_LOCK_MS
      );
    },
    [currentIndex, isAnimating, prefersReducedMotion]
  );

  const jumpTo = useCallback(
    (idx) => {
      if (isAnimating || idx === currentIndex) return;
      setCurrentIndex(idx);
    },
    [isAnimating, currentIndex]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") triggerTop("right");
      if (e.key === "ArrowRight") triggerTop("left");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerTop]);

  useEffect(() => () => clearTimeout(lockTimer.current), []);

  return (
    <section id="projects" className="relative border-t border-[var(--border)]">
      <Container className="pt-28 md:pt-36 pb-20 md:pb-28">
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />

        <div className="relative mt-16 h-[560px] sm:h-[600px] md:h-[640px] lg:h-[680px]">
          {PROJECTS.map((project) => {
            const pos = (project.originalIndex - currentIndex + total) % total;
            if (pos >= VISIBLE_DEPTH) return null;

            return (
              <SwipeCard
                key={project.title}
                ref={(el) => {
                  if (el) cardRefs.current.set(project.title, el);
                  else cardRefs.current.delete(project.title);
                }}
                project={project}
                stackPosition={pos}
                total={total}
                isReduced={prefersReducedMotion}
                onSwiped={onSwiped}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5 sm:gap-6 mt-10">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => triggerTop("right")}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-[var(--text)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {PROJECTS.map((project) => {
              const isActive = project.originalIndex === currentIndex;
              return (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`Go to ${project.title}`}
                  aria-current={isActive}
                  onClick={() => jumpTo(project.originalIndex)}
                  disabled={isAnimating}
                  className="h-[3px] rounded-full transition-all duration-300 disabled:cursor-not-allowed"
                  style={{
                    width: isActive ? "28px" : "12px",
                    backgroundColor: isActive ? "var(--text)" : "var(--border)",
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => triggerTop("left")}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-[var(--text)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronRight size={18} />
          </button>
        </div>
      </Container>

      <div className="relative z-10 pt-24 pb-36 flex justify-center">
        <HireMeButton />
      </div>
    </section>
  );
}