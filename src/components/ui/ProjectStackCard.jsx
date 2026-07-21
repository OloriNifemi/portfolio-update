import { motion, useTransform } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbBrandGithub } from "react-icons/tb";

const EASE = [0.16, 1, 0.3, 1];

function CardContent({ project, index, total }) {
  return (
    <>
      <div className="relative h-36 sm:h-44 md:h-52 lg:h-56 shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
      <div className="p-5 sm:p-6 lg:p-8 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="
              w-6 h-6 rounded-[7px]
              bg-[var(--text)] text-[var(--bg)]
              flex items-center justify-center
              text-[11px] font-semibold
              "
            >
              P
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Precious Obafemi · Case Study
            </span>
          </div>
          <span className="text-[11px] tracking-[0.1em] text-[var(--muted)] tabular-nums">
            <span className="text-[var(--text)] font-medium">{String(index + 1).padStart(2, "0")}</span>
            {" / "}{String(total).padStart(2, "0")}
          </span>
        </div>

        <h2 className="mt-4 font-serif text-2xl lg:text-3xl text-[var(--text)] leading-tight">
          {project.title}
        </h2>

        <p className="mt-3 text-[14px] leading-6 text-[var(--muted)] max-w-2xl">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
              px-3 py-1 rounded-full border border-[var(--border)]
              text-[10px] uppercase tracking-[0.1em]
              text-[var(--muted)] bg-[var(--bg)]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6 pt-5 border-t border-[var(--border)] relative z-10">
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live flex items-center gap-2 text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            Live Demo
            <HiOutlineArrowUpRight size={16} className="transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
          </a>

          <a
            href={project.codeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <TbBrandGithub size={16} />
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}

const TRANSITION_FRACTION = 0.35;
const CURRENT = { opacity: 1, y: "0vh", scale: 1 };
const HIDDEN = { opacity: 0, y: "40vh", scale: 0.96 };
const STACKED_NEAR = { opacity: 0.95, y: "-6vh", scale: 0.97 };
const STACKED_FAR = { opacity: 0.85, y: "-12vh", scale: 0.92 };

export default function ProjectStackCard({
  project,
  index,
  total,
  scrollYProgress,
  staticCard = false,
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const segLen = segEnd - segStart;
  const transitionLen = segLen * TRANSITION_FRACTION;
  const keyframes = [];

  if (isFirst) {
    // Already fully in place at the very top of the page — no entrance.
    keyframes.push({ t: 0, ...CURRENT });
  } else {
    keyframes.push({ t: segStart - transitionLen, ...HIDDEN });
    keyframes.push({ t: segStart, ...CURRENT });
  }

  if (isLast) {
    // Stays fully in view all the way to the end of the scroll track.
    keyframes.push({ t: 1, ...CURRENT });
  } else {
    keyframes.push({ t: segEnd - transitionLen, ...CURRENT });
    keyframes.push({ t: segEnd, ...STACKED_NEAR });
    keyframes.push({ t: 1, ...STACKED_FAR });
  }

  const times = keyframes.map((k) => k.t);

  const scale = useTransform(scrollYProgress, times, keyframes.map((k) => k.scale));
  const y = useTransform(scrollYProgress, times, keyframes.map((k) => k.y));
  const opacity = useTransform(scrollYProgress, times, keyframes.map((k) => k.opacity));
  const pointerEvents = useTransform(opacity, (v) => (v >= 0.999 ? "auto" : "none"));

  if (staticCard) {
    return (
      <article
        className="
        pointer-events-auto flex flex-col
        w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto
        rounded-[22px] sm:rounded-[28px] overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        shadow-[0_30px_60px_rgba(0,0,0,.16)]
        "
      >
        <CardContent project={project} index={index} total={total} />
      </article>
    );
  }

  return (
    <motion.div
      style={{ scale, y, opacity, zIndex: index, willChange: "transform, opacity", pointerEvents }}
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
    >
      <motion.article
        whileHover={{ scale: 1.015, y: -6 }}
        transition={{ duration: 0.15, ease: EASE }}
        className="
        relative flex flex-col
        w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl
        max-h-[92vh] sm:max-h-[88vh]
        rounded-[22px] sm:rounded-[28px] overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        shadow-[0_30px_60px_rgba(0,0,0,.16)]
        cursor-pointer
        "
      >
        <CardContent project={project} index={index} total={total} />
      </motion.article>
    </motion.div>
  );
}