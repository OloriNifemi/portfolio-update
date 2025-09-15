import React, { useState } from 'react'
import { TbCodeCircle2 } from "react-icons/tb";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      number: "01",
      title: "web development",
      desc: `Performance and precision work hand in hand in this carefully crafted codebase 
      engineered for speed, optimized for reliability, and structured with reusability in mind.
      Every function is designed to be efficient, scalable, and easy to maintain, ensuring long-term dependability in any environment.`,
    },
    {
      number: "02",
      title: "UI/UX implementation",
      desc: `Precision coding transforms designs into seamless experiences, 
      blending structure with interactivity for consistency across devices. 
      Every component is optimized for responsiveness, accessibility, and performance—ensuring fluid navigation, 
      intuitive engagement, and maintainable interfaces that deliver both beauty and functionality in every user
      journey.`,
    },
    {
      number: "03",
      title: "web maintenance",
      desc: `Reliable upkeep and seamless functionality are at the heart of this service, 
      designed to keep your digital presence running smoothly. From fixing bugs to improving
      performance and ensuring security, every update is handled with precision, efficiency, and long-term stability.`,
    },
  ];

  return (
    <div className='flex flex-col gap-10 text-gray-200 font-manRope justify-center min-h-screen items-center px-6'>
      {/* Section Title */}
      <div className='flex flex-col justify-center items-center'>
        <p className='text-[14px]'>Services</p>
        <h2 className='text-[28px]'>What I <span className='text-[#01dbc6]'>do.</span></h2>
      </div>

      {/* Services Grid */}
      <div className='grid gap-6 w-full max-w-6xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex flex-col justify-end p-4 rounded-xl border transition-all ease-in-out duration-500 cursor-pointer
              ${
                activeIndex === idx
                  ? "bg-[#01dbc5ba]/90 text-black/80 shadow-2xl shadow-[#01dbc650] border-[#01dbc6] font-medium"
                  : "bg-[#292626] text-gray-200 border-[#01dbc6] hover:bg-[#01dbc6] hover:text-black/80 font-medium"
              }`}
          >
            <span className='flex justify-end'>
              <p className='text-4xl text-[#4b4a4a4b] font-manRope font-bold'>{item.number}</p>
            </span>
            <TbCodeCircle2 className='text-[30px]' />
            <div>
              <h2 className='text-[15px] font-bold font-montSerrat py-7 uppercase'>{item.title}</h2>
              <p className='text-[12px] font-manRope leading-6 w-[90%]'>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
