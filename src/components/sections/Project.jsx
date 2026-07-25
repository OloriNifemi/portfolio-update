import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import SwipeCard from "../ui/SwipeCard";

import Ecommerce from "../../assets/Ecommerce.png";
import WeddingWeb from "../../assets/WeddingWeb.png";
import Birthday from "../../assets/Birthday.png";

const EASE = [0.16, 1, 0.3, 1];
const HINT_AUTO_DISMISS_MS = 4000;

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

const VISIBLE_DEPTH = 3; // how many cards deep the stack renders at once

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const total = PROJECTS.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const cardRefs = useRef(new Map());

  const dismissHint = useCallback(() => setShowHint(false), []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), HINT_AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, []);

  const advance = useCallback(
    (direction) => {
      setCurrentIndex((prev) =>
        direction === "left" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [total]
  );

  const onSwiped = useCallback(
    (direction) => {
      advance(direction);
      setIsAnimating(false);
    },
    [advance]
  );

  const triggerTop = useCallback(
    (direction) => {
      if (isAnimating) return;
      const topProject = PROJECTS[currentIndex];
      const topCard = cardRefs.current.get(topProject.title);
      if (!topCard) return;

      setShowHint(false);
      setIsAnimating(true);
      topCard.trigger(direction);
    },
    [currentIndex, isAnimating]
  );

  const jumpTo = useCallback(
    (idx) => {
      if (isAnimating || idx === currentIndex) return;
      setShowHint(false);
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

  return (
    <section id="projects" className="relative border-t border-[var(--border)] overflow-x-hidden overscroll-x-none">
      <Container className="pt-28 md:pt-36 pb-20 md:pb-28">
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />

        <div className="relative mt-16 overflow-hidden overscroll-x-none ">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => triggerTop("right")}
            disabled={isAnimating}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[var(--border)] items-center justify-center text-[var(--text)] bg-[var(--bg)] hover:border-[var(--text)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => triggerTop("left")}
            disabled={isAnimating}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[var(--border)] items-center justify-center text-[var(--text)] bg-[var(--bg)] hover:border-[var(--text)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronRight size={18} />
          </button>

          <div className=" relative h-[610px] sm:h-[580px] md:h-[560px] lg:h-[580px] overflow-hidden overscroll-x-none touch-pan-y ">
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
                  onInteractionStart={dismissHint}
                />
              );
            })}

            <AnimatePresence>
              {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className="lg:hidden absolute bottom-5 left-1/2 -translate-x-1/2 z-[999]"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white ">
                  <HiOutlineChevronLeft size={14} />
                  <span className="text-[11px] uppercase tracking-[0.15em]">
                    Swipe
                  </span>
                  <HiOutlineChevronRight size={14} />
                </div>
              </motion.div>
              )}
            </AnimatePresence>
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
      </Container>

      <div className="relative z-10 pt-24 pb-36 flex justify-center">
        <HireMeButton />
      </div>
    </section>
  );
}