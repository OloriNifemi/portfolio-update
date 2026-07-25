import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";

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
  const [showHint, setShowHint] = useState(false);
  const cardRefs = useRef(new Map());

  // Track visibility on the carousel itself (not the whole section).
  // `once: false` so the hint can re-trigger every time the user
  // scrolls back into view.
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.3 });

  // Hint visibility is driven ONLY by scroll position — no auto-dismiss
  // timer, and nothing else (touching cards, clicking nav) hides it.
  // It stays up the whole time the section is in view, and only clears
  // once the user scrolls out.
  useEffect(() => {
    setShowHint(isInView);
  }, [isInView]);

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

      setIsAnimating(true);
      topCard.trigger(direction);
    },
    [currentIndex, isAnimating]
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

  return (
    <section id="projects" className="relative border-t border-[var(--border)] overflow-x-hidden">
      <Container className="pt-28 md:pt-36 pb-20 md:pb-28">
        <SectionHeading eyebrow="Selected Work" title="Featured projects." />

        <div className="relative mt-16 overflow-hidden overscroll-x-none">
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

          <div
            ref={carouselRef}
            className="relative h-[610px] sm:h-[580px] md:h-[560px] lg:h-[580px]"
            style={{ overflow: "clip" }}
          >
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

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      "0 0 0 rgba(184,156,100,0)",
                      "0 0 16px rgba(184,156,100,.3)",
                      "0 0 0 rgba(184,156,100,0)",
                    ],
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                    scale: 0.9,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    x: { duration: 0.3 },
                    scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="rounded-full absolute top-4 left-4 sm:top-5 sm:left-5 z-50 lg:hidden pointer-events-none"
                >
                  <div
                    className="
                      flex items-center gap-1.5
                      rounded-full
                      bg-white/90
                      backdrop-blur-md
                      px-3.5
                      py-1.5
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-black
                      shadow-sm
                    "
                  >
                    Swipe to explore!
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