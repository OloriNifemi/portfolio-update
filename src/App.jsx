import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

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
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);

  // Lock scrolling while the preloader is visible
  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    document.body.style.overflow = loading ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Prevent browser from restoring previous scroll position
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  const handlePreloaderComplete = () => {
    window.scrollTo(0, 0);
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            key="preloader"
            onComplete={handlePreloaderComplete}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="bg-[var(--bg)] text-[var(--text)] antialiased">
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
          <ScrollToTop />
        </div>
      )}
    </>
  );
}

export default App;