import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu2, TbX } from "react-icons/tb";
import Container from "../ui/Container";
import useActiveSection from "../hooks/useActiveSection";

import DarkModeToggle from "../ui/DarkmodeTogggle";
import { NAV_LINKS } from "../constants/nav";
import { scrollToSection } from "../utils/Scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));

  const headerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id, { offset: 80, duration: 700 });
    setIsOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-[var(--bg)]/90
        ${scrolled ? "border-b border-[var(--border)]" : "border-b border-transparent"}`}
    >
      <Container className="flex items-center justify-between h-20">
        
        <a  href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="font-serif italic text-[30px] text-[var(--text)] tracking-tight"
        >
          Precious<span className="text-[var(--muted)]">.</span>
        </a>

        <div className="flex items-center justify-center gap-10">
          {/* Desktop nav */}
          <div className="hidden lg:flex justify-center items-center lg:gap-5">
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                
                <a  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={`relative text-[13px] uppercase tracking-[0.12em] transition-colors duration-300
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

          
          <a  href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden lg:inline-flex items-center px-6 py-2.5 border border-[var(--text)] text-[var(--text)] text-[13px]
              uppercase tracking-[0.1em] rounded-full ease-in-out transition-all duration-500 hover:bg-[var(--text)] hover:text-[var(--bg)]"
          >
            Hire Me!
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-5 lg:hidden">
          <DarkModeToggle className="lg:hidden" />
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="lg:hidden text-[var(--text)]"
          >
            {isOpen ? <TbX size={28} /> : <TbMenu2 size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="will-change-transform"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <nav className="lg:hidden bg-[var(--bg)] border-b border-[var(--border)]">
              <Container className="flex flex-col gap-5 py-8">
                {NAV_LINKS.map((link) => (
                  
                  <a  key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={activeId === link.id ? "true" : undefined}
                    className={`font-serif italic text-[22px] ${
                      activeId === link.id
                        ? "text-[var(--text)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}

                
                <a  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="mt-2 px-6 py-2.5 border border-[var(--text)] text-[var(--text)] text-[13px] uppercase tracking-[0.1em] rounded-lg ease-in-out transition-all duration-500 text-center"
                >
                  Hire Me!
                </a>
              </Container>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;