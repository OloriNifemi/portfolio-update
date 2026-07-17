import React from "react";
import Header from "./components/layout/Header";
import Footer from "./Components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./Components/sections/Project";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";

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