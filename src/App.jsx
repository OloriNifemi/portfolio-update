import React from 'react'
import Layout from './Components/Layout/MainLayout'
import Home from './Components/pages/Home'
import Project from './Components/pages/Project'
import About from './Components/pages/About'

const App = () => {
  return (
    <Layout>
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="project">
        <Project />
      </section>
    </Layout>
  )
}

export default App
