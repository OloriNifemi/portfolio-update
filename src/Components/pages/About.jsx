import React from 'react'
import Skills from "../ui/Skills"
import AboutImg from "../../assets/aboutImg.png"
import CssLogo from "../../assets/CSS-LOGO.webp"
import HtmlLogo from "../../assets/HTML-LOGO.webp"
import JavaLogo from "../../assets/JAVA-LOGO.webp"
import ReactLogo from "../../assets/REACT-LOGO.webp"

const About = () => {
  return (
    <div className="min-h-screen pt-[120px] flex flex-col justify-center items-center bg-[#181717] gap-10 ">
      {/* Bio Section */}
      <div className='flex flex-col justify-center items-center text-gray-200'>
        <p className='text-[14px] uppercase'>my bio</p>
        <h2 className='text-[28px]'>About <span className='text-[#01dbc6]'>Me.</span></h2>
      </div>

      {/* Grid Section */}
      <div className="p-8 flex justify-center items-center">
        <div className='grid  gap-10 bg-transparent w-full px-10 sm:grid-cols-1 md:grid-cols-2'>
          
          {/* Image container */}
          <div className='flex relative justify-center bg-transparent'>
            <div className="w-[250px] h-[300px] rounded-full bg-white ring-1 ring-[#01DBC6] ring-offset-[20px] ring-offset-[#181717] relative">
              <img src={AboutImg} alt="image" className='w-full h-full rounded-full' />

              {/* Four corner divs */}
              <div className='flex justify-center items-center absolute top-8 left-0 bg-black text-black/80 size-[50px] rounded-full'>
               <img src={HtmlLogo} alt="logo" className='size-[70%] rounded-full'/>
              </div>

              <div className='flex justify-center items-center absolute top-0 right-5 bg-black text-black/80 size-[50px] rounded-full'>
               <img src={CssLogo} alt="logo" className='size-[70%] rounded-full' />
              </div>

              <div className='flex justify-center items-center absolute bottom-0 left-5 bg-black text-black/80 size-[50px] rounded-full'>
               <img src={JavaLogo} alt="logo" className='size-[70%] rounded-full' />
              </div>

              <div className='flex justify-center items-center absolute bottom-8 right-0 bg-black text-black/80 size-[50px] rounded-full'>
               <img src={ReactLogo} alt="logo" className='size-[70%] rounded-full' />
              </div>
            </div>
          </div>

          {/* Text container */}
          <div className='flex gap-8 flex-col items-center min-h-[200px] bg-transparent max-sm:pt-[70px]'>
            <p className='text-gray-200 lg:w-[70%] w-full font-merriWeather lg:text-[16px] text-[12px] font-medium'>
              I'm a passionate Frontend Developer dedicated to turning ideas into seamless digital experiences.
              With a focus on performance, precision, and clean code, I craft responsive and user-friendly websites 
              that blend design with functionality.
            </p>

            <p className='text-gray-200 lg:w-[70%] w-full font-merriWeather lg:text-[16px] text-[12px] font-medium'>
              My work is guided by attention to detail, scalability,
              and maintainability ensuring every project not only looks good but also performs exceptionally.
              Beyond coding, I enjoy learning new tools, experimenting with modern UI/UX trends,
              and pushing creative boundaries to deliver solutions that leave a lasting impression.</p>
          </div>

        </div>
      </div>
      {/* Services Section */}
      <section className="bg-[#181717] p-2 z-10 w-full">
        <Skills />
      </section>
    </div>
  )
}

export default About
