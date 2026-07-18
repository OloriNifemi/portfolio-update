import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu2, TbX } from "react-icons/tb";
import Container from "../ui/Container";
import useActiveSection from "../hooks/Useactivesection";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/90 backdrop-blur-md
        ${scrolled ? "border-b border-[#EAEAEA]" : "border-b border-transparent"}`}
    >
      <Container className="flex items-center justify-between h-20">
        <a href="#hero" className="font-serif italic text-[22px] text-[#111111] tracking-tight">
          Precious<span className="text-[#666666]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative text-[13px] uppercase tracking-[0.12em] pb-1 transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#111111]
                after:transition-all after:duration-300
                ${
                  activeId === link.id
                    ? "text-[#111111] after:w-full"
                    : "text-[#666666] hover:text-[#111111] after:w-0 hover:after:w-full"
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="  hidden lg:inline-flex items-center px-6 py-2.5 border border-[#111111] text-[#111111] text-[13px]
            uppercase tracking-[0.1em] rounded-lg ease-in-out transition-all duration-500 hover:bg-[#111111] hover:text-white"
        >
          Let's Talk
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="lg:hidden text-[#111111]"
        >
          {isOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white border-b border-[#EAEAEA]"
          >
            <Container className="flex flex-col gap-5 py-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif italic text-[22px] ${
                    activeId === link.id ? "text-[#111111]" : "text-[#666666]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className=" mt-2 px-6 py-2.5  border border-[#111111] text-[#111111] text-[13px] uppercase tracking-[0.1em]
                rounded-lg ease-in-out transition-all duration-500 text-center"
              >
                Let's Talk 
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;