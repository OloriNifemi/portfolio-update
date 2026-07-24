import { motion } from "framer-motion";
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

// Plain card — no scroll-linked transforms. Whichever card is "active" gets
// mounted by the parent's AnimatePresence; this component just renders it.
export default function ProjectStackCard({ project, index, total }) {
  return (
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
  );
}