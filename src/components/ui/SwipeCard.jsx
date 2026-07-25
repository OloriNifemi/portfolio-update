import { forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import ProjectStackCard from "./ProjectStackCard";

const EXIT_DISTANCE = 560;
const DRAG_DISTANCE_THRESHOLD = 170;
const DRAG_VELOCITY_THRESHOLD = 650;
const FALLBACK_EXIT_VELOCITY = 900;
const EXIT_SPRING = { type: "spring", stiffness: 115, damping: 20, mass: 0.9, };
const SNAP_BACK_SPRING = { type: "spring", stiffness: 250, damping: 22, mass: 0.8, };

const SwipeCard = forwardRef(function SwipeCard(
  { project, stackPosition, total, isReduced, onSwiped, onInteractionStart },
  ref
) {
  const isTop = stackPosition === 0;

  // Raw motion value — dragging this never triggers a React re-render.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 320], [-7, 7] );
  const cardOpacity = useTransform(x, [-340, -220, 0, 220, 340], [0, 1, 1, 1, 0] );
  const prevHint = useTransform(x, [40, 150], [0, 1]);
  const nextHint = useTransform(x, [-150, -40], [1, 0]);

  const exit = (direction, rawVelocity) => {
    if (isReduced) {
      onSwiped(direction);
      return;
    }
    const target = direction === "left" ? -EXIT_DISTANCE : EXIT_DISTANCE;
    const magnitude = Math.max(Math.abs(rawVelocity ?? 0), FALLBACK_EXIT_VELOCITY);
    const signedVelocity = direction === "left" ? -magnitude : magnitude;

    animate(x, target, {
      ...EXIT_SPRING,
      velocity: signedVelocity,
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
      exit(info.offset.x < 0 ? "left" : "right", info.velocity.x);
    } else {
      animate(x, 0, { ...SNAP_BACK_SPRING, velocity: info.velocity.x });
    }
  };

  const dragStyle = isTop && !isReduced ? { x, rotate, opacity: cardOpacity } : {};

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 ${
        isTop && !isReduced ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      style={{ zIndex: total - stackPosition, touchAction: "pan-y", WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none", ...dragStyle, }}
      animate={{ scale: 1 - stackPosition * 0.035, y: stackPosition * 12 }}
      transition={
        isReduced
          ? { duration: 0 }
          : isTop
          ? { duration: 0.12, ease: "easeOut" }
          : { type: "spring", stiffness: 220, damping: 28 }
        }
        drag={isTop && !isReduced ? "x" : false}
        dragConstraints={{ left: 0, right: 0, }}
        dragElastic={0.28}
        dragMomentum={false}
        dragDirectionLock
        dragPropagation={false}
        onDragStart={isTop ? () => onInteractionStart?.() : undefined}
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