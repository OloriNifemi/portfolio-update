import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRELOADER } from "../constants/theme";

// A gentler curve than the site's usual expo-out EASE — smooth accel/decel,
// no sharp snap at the start or end.
const SOFT_EASE = [0.4, 0, 0.2, 1];

// One vertical period of the weave, in local SVG units. The pattern is
// tiled and scrolled by exactly one period, so the loop is seamless.
const TILE_H = 40;
const TILE_W = 48;
const TILE_COUNT = 4; // enough tiles to always fill the viewport while scrolling
const SCROLL_DURATION = 5.5; // slow, unhurried drift — a texture, not a spinner

// Two sine-like strands, phase-shifted by half a period, approximated with
// quadratic beziers. They cross at y=0/20/40 and bow apart at y=10/30 —
// that's where the connecting rungs are drawn, so the rungs widen and
// vanish as the strands actually weave through each other.
const STRAND_GOLD = "M24,0 Q36,5 36,10 Q36,15 24,20 Q12,25 12,30 Q12,35 24,40";
const STRAND_INK = "M24,0 Q12,5 12,10 Q12,15 24,20 Q36,25 36,30 Q36,35 24,40";

const DnaHelix = ({ reduced }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const goldGradId = `helixGold-${uid}`;
  const inkGradId = `helixInk-${uid}`;
  const glowId = `helixGlow-${uid}`;

  const tile = (
    <g>
      <line x1="12" y1="10" x2="36" y2="10" className="dna-weave__rung" />
      <line x1="12" y1="30" x2="36" y2="30" className="dna-weave__rung" />
      <path d={STRAND_INK} className="dna-weave__strand dna-weave__strand--ink" />
      <path
        d={STRAND_GOLD}
        className="dna-weave__strand dna-weave__strand--gold"
        filter={reduced ? undefined : `url(#${glowId})`}
      />
    </g>
  );

  return (
    <div className={`dna-weave ${reduced ? "dna-weave--static" : ""}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${TILE_W} ${TILE_H * 3}`}
        width={TILE_W}
        height={TILE_H * 3}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={goldGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id={inkGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--text)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--text)" stopOpacity="0.05" />
          </linearGradient>
          <filter id={glowId} x="-75%" y="-75%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          className="dna-weave__track"
          style={{ animationDuration: `${SCROLL_DURATION}s` }}
        >
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <g key={i} transform={`translate(0, ${i * TILE_H})`}>
              {tile}
            </g>
          ))}
        </g>
      </svg>

      <style>{`
        .dna-weave {
          position: relative;
          width: ${TILE_W}px;
          height: ${TILE_H * 3}px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 82%,
            transparent
          );
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 82%,
            transparent
          );
        }
        .dna-weave__strand {
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
        }
        .dna-weave__strand--gold {
          stroke: url(#${goldGradId});
        }
        .dna-weave__strand--ink {
          stroke: url(#${inkGradId});
          stroke-width: 1.5;
        }
        .dna-weave__rung {
          stroke: var(--border);
          stroke-width: 1;
          opacity: 0.6;
        }
        .dna-weave__track {
          animation: dna-weave-scroll linear infinite;
        }
        .dna-weave--static .dna-weave__track {
          animation: none;
        }
        .dna-weave--static .dna-weave__strand--gold {
          animation: dna-weave-pulse 2.4s ease-in-out infinite;
        }
        @keyframes dna-weave-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-${TILE_H}px); }
        }
        @keyframes dna-weave-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const Preloader = ({ onComplete, duration = PRELOADER.defaultDuration }) => {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Ensure dark mode class is applied from localStorage on preloader load
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const timer = setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? PRELOADER.reducedMotionDuration : duration
    );

    return () => clearTimeout(timer);
  }, [duration, shouldReduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 1.4, ease: SOFT_EASE }}
          className="fixed inset-0 z-[999] bg-[var(--bg)] flex items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center text-center max-w-xl px-8">

            {/* Eyebrow */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.eyebrowDelay, duration: 1, ease: SOFT_EASE }}
              className="uppercase tracking-[0.35em] text-[11px] text-[var(--subtle)]"
            >
              Precious Obafemi
            </motion.p>

            {/* DNA helix loader */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.headingDelay, duration: 1.1, ease: SOFT_EASE }}
              className="mt-8"
            >
              <DnaHelix reduced={shouldReduceMotion} />
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: PRELOADER.footerDelay, duration: 1, ease: SOFT_EASE }}
              className="mt-12 text-[11px] uppercase tracking-[0.28em] text-[var(--subtle)]"
            >
              Frontend Developer · Lagos, Nigeria
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;