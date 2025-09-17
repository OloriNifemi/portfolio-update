import React from 'react'

const Skills = () => {
  return (
    <div className='grid lg:grid-cols-2 max-md:grid-cols-1 lg:gap-5 gap-[60px] justify-between md:px-[50px] pt-[120px] max-sm:px-[30px] lg:px-[92px] min-h-[50vh]'>
        <div className=' flex flex-col bg-transparent'>
            <div className='flex flex-col text-gray-200'>
                <p className='text-[14px] uppercase'>skills</p>
                <h2 className='text-[28px]'>Technical <span className='text-[#01dbc6]'>Skills.</span></h2>
            </div>
            <p className='mt-5 text-gray-200 lg:w-[80%] md:w-[80%] w-full font-merriWeather lg:text-[16px] text-[12px] font-medium'>
                I excel at building responsive, user-friendly, and scalable web applications using modern technologies. 
                With strong attention to detail and problem-solving skills, I efficiently transform ideas into seamless 
                digital experiences, delivering high-quality solutions that balance design, performance, and functionality.
            </p>
        </div>

        <div className='bg-transparent flex flex-col gap-7'>

            <div className='text-gray-200 flex gap-7 justify-center'>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>HTML5</p>
                </div>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>JAVASCRIPT</p>
                </div>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>CSS3</p>
                </div>
            </div>

            <div className='text-gray-200 flex gap-7 justify-center'>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>REACT</p>
                </div>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>TAILWIND</p>
                </div>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>GIT / GITHUB</p>
                </div>
            </div>

            <div className='text-gray-200 flex gap-7 justify-center'>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>UI/UX IMPLEMENTATION</p>
                </div>
                <div className='rounded px-3 py-2 shadow-[0_0_10px_#01dbc680,0_0_25px_#01dbc640] border border-[#01dbc6]'>
                <p>TYPESCRIPT</p>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Skills