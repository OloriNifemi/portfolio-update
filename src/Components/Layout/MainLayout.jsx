import React from "react"
import Header from "../static/Header"
import Footer from "../static/Footer"
import Home from "../pages/Home"
import About from "../pages/About"
import Project from "../pages/Project"

const Layout = () => {
   return (
    <div>
      <Header/>
        <main>
          <section id="home">
            <Home />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="project">
            <Project />
          </section>
        </main>
      <Footer />
    </div>
   )
}
export default Layout
