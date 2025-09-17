import React from 'react'

const Project = () => {
  return (
    <div className='flex flex-col justify-center md:px-[50px] max-sm:px-[30px] lg:px-[92px] min-h-screen pt-[120px] bg-[#181717]'>
      <div className='flex flex-col text-gray-200'>
        <p className='text-[14px] text-center uppercase'>portfolio</p>
        <h2 className='text-center text-[28px]'>pro<span className='text-[#01dbc6] text-center'>jects.</span></h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className='min-h-[200px] bg-red-600 '>gggggggggggggggggggggggggg</div>
        <div className='min-h-[200px] bg-red-600 '>gggggggggggggggggggggggggg</div>
        <div className='min-h-[200px] bg-red-600 '>gggggggggggggggggggggggggg</div>
      </div>

    </div>
  )
}

export default Project