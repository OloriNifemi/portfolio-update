import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu2, TbX } from "react-icons/tb";
import Container from "../ui/Container";
import useActiveSection from "../hooks/useActiveSection";

import DarkModeToggle from "../ui/DarkmodeTogggle";
import { NAV_LINKS } from "../constants/nav";
import { DURATIONS } from "../constants/theme";



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[var(--bg)]/90 backdrop-blur-md
        ${scrolled ? "border-b border-[var(--border)]" : "border-b border-transparent"}`}
    >
      <Container className="flex items-center justify-between h-20">
        <a href="#hero" className="font-serif italic text-[30px] text-[var(--text)] tracking-tight">
          Precious<span className="text-[var(--muted)]">.</span>
        </a>

        <div className="flex items-center justify-center gap-10">

          {/* Desktop nav */}
          <div className="hidden lg:flex justify-between items-center lg:gap-5 ">
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative text-[13px] uppercase tracking-[0.12em] pb-1 transition-colors duration-300
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[var(--text)]
                    after:transition-all after:duration-300
                    ${
                      activeId === link.id
                        ? "text-[var(--text)] after:w-full"
                        : "text-[var(--muted)] hover:text-[var(--text)] after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <DarkModeToggle className="hidden lg:flex" />

          </div>

          <a
            href="#contact"
            className="  hidden lg:inline-flex items-center px-6 py-2.5 border border-[var(--text)] text-[var(--text)] text-[13px]
              uppercase tracking-[0.1em] rounded-full ease-in-out transition-all duration-500 hover:bg-[var(--text)] hover:text-[var(--bg)]"
          >
            Hire Me! 
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <DarkModeToggle className="lg:hidden" />
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="lg:hidden text-[var(--text)]"
          >
            {isOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
          </button>
        </div>
        
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATIONS.fast, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[var(--bg)] border-b border-[var(--border)]"
          >
            <Container className="flex flex-col gap-5 py-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif italic text-[22px] ${
                    activeId === link.id ? "text-[var(--text)]" : "text-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className=" mt-2 px-6 py-2.5  border border-[var(--text)] text-[var(--text)] text-[13px] uppercase tracking-[0.1em]
                rounded-lg ease-in-out transition-all duration-500 text-center"
              >
                Hire Me! 
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
