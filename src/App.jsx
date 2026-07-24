import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Project";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";

import Preloader from "./components/ui/Preloader";

const EASE = [0.16, 1, 0.3, 1];

function App() {
  const [loading, setLoading] = useState(true);

  // Lock scrolling while preloader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Prevent browser from restoring previous scroll position
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handlePreloaderComplete = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader
            key="preloader"
            onComplete={handlePreloaderComplete}
          />
        ) : (
          <motion.div
            key="app"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
            className="bg-[var(--bg)] text-[var(--text)] antialiased"
          >
            <Header />

            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Services />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;