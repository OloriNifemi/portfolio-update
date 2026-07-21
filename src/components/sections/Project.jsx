import { useRef, useState } from "react";
import { useScroll, useReducedMotion, motion } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import HireMeButton from "../ui/HireMeButton";
import ProjectStackCard from "../ui/ProjectStackCard";
import { PROJECTS, PROJECT_CATEGORIES, FEATURED_PROJECTS_COUNT } from "../../constants/projects";
import { EASE } from "../../constants/theme";

const VH_PER_CARD = 120;
const STICKY_TOP_OFFSET = "6rem";

// Category filter button
function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-2 rounded-lg text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
            activeCategory === cat.id
              ? "bg-[var(--text)] text-[var(--bg)] border border-[var(--text)]"
              : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--text)]"
          }`}
        >
          {cat.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

// Featured projects badge section
function FeaturedSection({ projects }) {
  const featured = projects.filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="mb-8 p-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <span className="text-[12px] uppercase tracking-[0.15em] font-semibold text-[var(--accent)]">
          Featured Projects
        </span>
      </div>
      <p className="text-[13px] text-[var(--muted)]">
        Scroll through my curated showcase of {featured.length} standout project{featured.length > 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Category options including "All"
  const categories = [
    { id: "all", label: "All Projects" },
    { id: PROJECT_CATEGORIES.ECOMMERCE, label: "E-Commerce" },
    { id: PROJECT_CATEGORIES.WEDDING, label: "Wedding" },
    { id: PROJECT_CATEGORIES.DESIGN_SYSTEM, label: "Design System" },
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Calculate container height based on number of projects
  const containerHeight = Math.max(filteredProjects.length * VH_PER_CARD + 100, 600);

  // For reduced motion, display all projects vertically
  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        id="projects"
        className="py-section lg:py-section-lg bg-[var(--bg)]"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <SectionHeading>Featured Works</SectionHeading>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              A curated collection of projects showcasing my expertise in frontend development,
              design systems, and full-stack solutions.
            </p>
          </motion.div>

          <div className="mt-12">
            <FeaturedSection projects={PROJECTS} />
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="space-y-8 max-w-4xl mx-auto">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <ProjectStackCard
                    project={project}
                    index={index}
                    total={filteredProjects.length}
                    staticCard={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
            className="mt-16 text-center"
          >
            <HireMeButton />
          </motion.div>
        </Container>
      </section>
    );
  }

  // Scroll-based stack animation for users who don't prefer reduced motion
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-section lg:py-section-lg bg-[var(--bg)]"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <SectionHeading>Featured Works</SectionHeading>
          <p className="mt-4 max-w-2xl mx-auto text-[var(--muted)]">
            A curated collection of projects showcasing my expertise in frontend development,
            design systems, and full-stack solutions. Scroll to explore each project in detail.
          </p>
        </motion.div>

        <FeaturedSection projects={PROJECTS} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </Container>

      {/* Stack container */}
      <div
        style={{ height: `${containerHeight}vh` }}
        className="relative"
      >
        <motion.div
          style={{ y: [`${STICKY_TOP_OFFSET}`, `${STICKY_TOP_OFFSET}`] }}
          className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden"
        >
          {filteredProjects.map((project, index) => (
            <ProjectStackCard
              key={project.id}
              project={project}
              index={index}
              total={filteredProjects.length}
              scrollYProgress={scrollYProgress}
              staticCard={false}
            />
          ))}
        </motion.div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="mt-16 text-center"
        >
          <HireMeButton />
        </motion.div>
      </Container>
    </section>
  );
}
