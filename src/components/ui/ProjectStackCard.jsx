import { motion, useTransform } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { TbBrandGithub } from "react-icons/tb";
import { EASE } from "../../constants/theme";

// Star rating component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < rating ? "bg-[var(--accent)]" : "bg-[var(--border)]"
          }`}
        />
      ))}
    </div>
  );
}

// Featured badge component
function FeaturedBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center gap-1.5"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--accent)]">
        Featured
      </span>
    </motion.div>
  );
}

// Project metadata row
function MetadataRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]/40">
      <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--subtle)]">
        {label}
      </span>
      <span className="text-[12px] font-medium text-[var(--text)]">{value}</span>
    </div>
  );
}

// Main card content
function CardContent({ project, index, total, showMetadata = true }) {
  const handleCopyTech = () => {
    const techStack = project.technologies.join(", ");
    navigator.clipboard.writeText(techStack);
  };

  return (
    <>
      {/* Image Section */}
      <div className="relative h-36 sm:h-44 md:h-52 lg:h-56 shrink-0 overflow-hidden bg-[var(--bg-alt)]">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        {project.featured && (
          <div className="absolute top-4 right-4">
            <FeaturedBadge />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">
        {/* Header with counter */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-[7px] bg-[var(--text)] text-[var(--bg)] flex items-center justify-center text-[11px] font-semibold">
              P
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Portfolio Project
            </span>
          </div>
          <span className="text-[11px] tracking-[0.1em] text-[var(--muted)] tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl lg:text-3xl text-[var(--text)] leading-tight">
          {project.title}
        </h2>

        {/* Subtitle */}
        {project.shortDesc && (
          <p className="mt-2 text-[13px] text-[var(--muted)] italic">
            {project.shortDesc}
          </p>
        )}

        {/* Description */}
        <p className="mt-4 text-[14px] leading-6 text-[var(--muted)] max-w-2xl">
          {project.desc}
        </p>

        {/* Metadata Section */}
        {showMetadata && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-6 pt-4 space-y-0 border-t border-[var(--border)]/50"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
              <div>
                <span className="text-[var(--subtle)] uppercase tracking-[0.1em] text-[11px]">
                  Role
                </span>
                <p className="text-[var(--text)] font-medium mt-1">{project.role}</p>
              </div>
              <div>
                <span className="text-[var(--subtle)] uppercase tracking-[0.1em] text-[11px]">
                  Timeline
                </span>
                <p className="text-[var(--text)] font-medium mt-1">{project.timeline}</p>
              </div>
            </div>
            {project.rating && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]/40">
                <span className="text-[var(--subtle)] uppercase tracking-[0.1em] text-[11px]">
                  Quality Rating
                </span>
                <div className="mt-2">
                  <StarRating rating={project.rating} />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {project.technologies.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ y: -2 }}
              onClick={handleCopyTech}
              title="Click to copy tech stack"
              className="px-3 py-1.5 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[11px] uppercase tracking-[0.1em] text-[var(--text)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 transition-all duration-300 cursor-pointer"
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-6 mt-8 pt-5 border-t border-[var(--border)]">
          <motion.a
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE }}
            href={project.liveHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={`Visit live demo of ${project.title}`}
          >
            Live Demo
            <HiOutlineArrowUpRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE }}
            href={project.codeHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={`View source code on GitHub`}
          >
            <TbBrandGithub size={16} />
            GitHub
          </motion.a>
        </div>
      </div>
    </>
  );
}

// Animation constants
const TRANSITION_FRACTION = 0.35;
const CURRENT = { opacity: 1, y: "0vh", scale: 1, blur: 0 };
const HIDDEN = { opacity: 0, y: "40vh", scale: 0.96, blur: 4 };
const STACKED_NEAR = { opacity: 0.95, y: "-6vh", scale: 0.97, blur: 0.5 };
const STACKED_FAR = { opacity: 0.85, y: "-12vh", scale: 0.92, blur: 2 };

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
    keyframes.push({ t: 0, ...CURRENT });
  } else {
    keyframes.push({ t: segStart - transitionLen, ...HIDDEN });
    keyframes.push({ t: segStart, ...CURRENT });
  }

  if (isLast) {
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
  const blurAmt = useTransform(scrollYProgress, times, keyframes.map((k) => k.blur));
  const filter = useTransform(blurAmt, (v) => `blur(${v}px)`);

  if (staticCard) {
    return (
      <article
        className="
        flex flex-col
        w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto
        rounded-[22px] sm:rounded-[28px] overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        shadow-[0_30px_60px_rgba(0,0,0,.16)]
        hover:shadow-[0_40px_80px_rgba(0,0,0,.24)]
        transition-shadow duration-500
        "
      >
        <CardContent project={project} index={index} total={total} />
      </article>
    );
  }

  return (
    <motion.div
      style={{ scale, y, opacity, filter, zIndex: index }}
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
    >
      <motion.article
        whileHover={{ scale: 1.015, y: -8 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="
        relative flex flex-col
        w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl
        max-h-[92vh] sm:max-h-[88vh]
        rounded-[22px] sm:rounded-[28px] overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        shadow-[0_30px_60px_rgba(0,0,0,.16)]
        hover:shadow-[0_50px_100px_rgba(0,0,0,.24)]
        transition-shadow duration-500
        "
      >
        <CardContent project={project} index={index} total={total} />
      </motion.article>
    </motion.div>
  );
}
