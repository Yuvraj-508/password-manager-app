import React from 'react'
import Heroimage from './Heroimage'
import { Link } from 'react-router'
function Hero() {
  return (
    <div className='flex flex-col md:flex-row md:gap-20 w-full min-h-screen items-center mt-5 md:mt-0'>
      <div className="left w-full md:w-1/2 md:mb-40 ">
        <div className=" left flex flex-col gap-8 md:items-start  items-center">
            <p className='abhaya md:text-[45px] text-[35px] md:leading-[58px] md:tracking-[0.05em]  '>Forget the stress of managing passwords</p>
            <p className='akhtab text-[14px] leading-[32px] tracking-[0.05em] text-[#888888] sm:max-w-[%] '>Store, manage, and access your passwords effortlessly with top-tier encryption and  Say goodbye to forgotten passwords</p>
           <Link to='/login'> <button className='hero-btn text-white px-3.5 py-2 text-[24px] md:tracking-[5px] cursor-pointer'>GET STARTED</button></Link>
        </div>
      </div>
      <div className="right w-full md:w-1/2 md:mb-50  mt-15 md:mt-0  ">
      <Heroimage/>
      </div>
    </div>
  )
}

export default Hero
