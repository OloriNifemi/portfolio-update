import React from 'react'
import { PiGithubLogoFill } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";
import { TfiLinkedin } from "react-icons/tfi";
import backgroundImage from "../../assets/bgPortfolioImg.jpg"
import Services from "../ui/Services"

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="relative flex justify-center items-center min-h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <div className='absolute flex flex-col gap-10 justify-center items-center'>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <h2 className="text-gray-200 md:text-4xl text-2xl font-bold font-manRope">
              Hi! I am <span className='text-[#01dbc6]'>Obafemi Ayomipo</span>
            </h2>
            <p className='text-gray-200 md:text-xl text-sm font-merriWeather md:w-[60%] w-[80%] text-center'>
              A seasoned
              <span className="text-[#01dbc6]"> FronEnd Developer </span> 
              transforming ideas into stunning digital experiences. Let's create something amazing!
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <PiGithubLogoFill />, href: "https://github.com/OloriNifemi" },
              { icon: <BiLogoGmail />, href: "ayomipoobafemi@gmail.com" },
              { icon: <TfiLinkedin />, href: "https://github.com/OloriNifemi                      " },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="
                flex justify-center items-center w-10 h-10 bg-white text-black rounded-full 
                transition-all duration-500 ease-in-out 
                hover:bg-black hover:text-[#01dbc6] 
                hover:scale-110 hover:shadow-lg hover:shadow-[#01dbc650]"
              >
                {React.cloneElement(item.icon, { className: "text-[18px]" })}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="bg-[#181717] p-2 z-10 w-full">
        <Services />
      </section>
    </div>
  )
}

export default Home
