import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import ProjectStackCard from "./ProjectStackCard";

const TRANSITION = { duration: 0.65, ease: [0.16, 1, 0.3, 1] };
const DRAG_SLIDE_THRESHOLD_RATIO = 0.2; // fraction of a slide's width needed to advance
const DRAG_VELOCITY_THRESHOLD = 500;

export default function ProjectSlider({
  projects,
  currentIndex,
  onIndexChange,
  onInteraction,
  isReduced,
}) {
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const x = useMotionValue(0);
  const total = projects.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSlideWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!slideWidth) return;
    animate(x, -currentIndex * slideWidth, isReduced ? { duration: 0 } : TRANSITION);
  }, [currentIndex, slideWidth, isReduced, x]);

  const handleDragEnd = (_, info) => {
    if (!slideWidth) return;
    const draggedRatio = -info.offset.x / slideWidth;
    const passedThreshold =
      Math.abs(draggedRatio) > DRAG_SLIDE_THRESHOLD_RATIO ||
      Math.abs(info.velocity.x) > DRAG_VELOCITY_THRESHOLD;

    let delta = 0;
    if (passedThreshold) delta = draggedRatio > 0 ? 1 : -1;

    const nextIndex = Math.min(total - 1, Math.max(0, currentIndex + delta));
    onIndexChange(nextIndex);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div
        className="flex h-full"
        style={{ x }}
        drag={isReduced ? false : "x"}
        dragConstraints={{ left: -(total - 1) * slideWidth, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => onInteraction?.()}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-full h-full shrink-0"
          >
            <ProjectStackCard project={project} index={project.originalIndex} total={total} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}