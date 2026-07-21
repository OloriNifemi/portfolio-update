import React, { useEffect, useState } from "react";
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

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
      </div>
    </>
  );
}

export default App;