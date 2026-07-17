import React from "react";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Hero from "./Components/sections/Hero";
import About from "./Components/sections/About";
import Projects from "./Components/sections/Project";
import Skills from "./Components/sections/Skills";
import Experience from "./Components/sections/Experience";
import Services from "./Components/sections/Services";
import Contact from "./Components/sections/Contact";

function App() {
  return (
    <div className="bg-white text-[#111111] antialiased">
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
  );
}

export default App;