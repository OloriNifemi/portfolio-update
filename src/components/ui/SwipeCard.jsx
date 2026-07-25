import { forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import ProjectStackCard from "./ProjectStackCard";

const EASE = [0.16, 1, 0.3, 1];

const EXIT_DISTANCE = 560;
const DRAG_DISTANCE_THRESHOLD = 120;
const DRAG_VELOCITY_THRESHOLD = 480;

const SwipeCard = forwardRef(function SwipeCard(
  { project, stackPosition, total, isReduced, onSwiped },
  ref
) {
  const isTop = stackPosition === 0;

  // Raw motion value — dragging this never triggers a React re-render.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-10, 10]);
  const cardOpacity = useTransform(x, [-260, -140, 0, 140, 260], [0, 1, 1, 1, 0]);
  const prevHint = useTransform(x, [40, 150], [0, 1]);
  const nextHint = useTransform(x, [-150, -40], [1, 0]);

  const exit = (direction) => {
    if (isReduced) {
      onSwiped(direction);
      return;
    }
    const target = direction === "left" ? -EXIT_DISTANCE : EXIT_DISTANCE;
    animate(x, target, {
      duration: 0.38,
      ease: EASE,
      onComplete: () => {
        onSwiped(direction);
        x.set(0);
      },
    });
  };

  // Exposes an imperative trigger so external buttons / keyboard shortcuts
  // can fire the exact same exit animation as a real drag would.
  useImperativeHandle(ref, () => ({
    trigger: (direction) => {
      if (isTop) exit(direction);
    },
  }));

  const handleDragEnd = (_, info) => {
    const passedDistance = Math.abs(info.offset.x) > DRAG_DISTANCE_THRESHOLD;
    const passedVelocity = Math.abs(info.velocity.x) > DRAG_VELOCITY_THRESHOLD;
    if (passedDistance || passedVelocity) {
      exit(info.offset.x < 0 ? "left" : "right");
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 34 });
    }
  };

  const dragStyle = isTop && !isReduced ? { x, rotate, opacity: cardOpacity } : {};

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 ${
        isTop && !isReduced ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      style={{ zIndex: total - stackPosition, touchAction: "pan-y", ...dragStyle }}
      animate={{ scale: 1 - stackPosition * 0.045, y: stackPosition * 16 }}
      transition={isReduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
      drag={isTop && !isReduced ? "x" : false}
      dragElastic={0.85}
      dragMomentum={false}
      onDragEnd={isTop ? handleDragEnd : undefined}
    >
      {isTop && !isReduced && (
        <>
          <motion.div
            style={{ opacity: prevHint }}
            className="pointer-events-none absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[var(--muted)]"
          >
            <HiOutlineArrowLeft size={14} />
            <span className="text-[10px] uppercase tracking-[0.15em]">Prev</span>
          </motion.div>
          <motion.div
            style={{ opacity: nextHint }}
            className="pointer-events-none absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[var(--muted)]"
          >
            <span className="text-[10px] uppercase tracking-[0.15em]">Next</span>
            <HiOutlineArrowRight size={14} />
          </motion.div>
        </>
      )}
      <ProjectStackCard project={project} index={project.originalIndex} total={total} />
    </motion.div>
  );
});

export default SwipeCard;