import React from 'react'
import { assets } from '../assets/assets'

export default function Header() {
    return (
      <div className='flex flex-col md:flex-row flex-wrap bg-[#1E90FF] rounded-lg px-6 md:px-10 lg:px-20 shadow-lg'>
        {/* Left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-8 md:py-[8vw] m-auto'>
          <p className='text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm md:text-base font-light'>
            <img className='w-24 md:w-32' src={assets.group_profiles} alt='Group Profiles' />
            <p className='leading-relaxed'>
              Simply browse through our extensive list of trusted doctors, 
              <br className='hidden sm:block' />
              and schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href='#speciality'
            className='flex items-center gap-3 bg-white px-6 py-3 rounded-full text-gray-700 text-sm md:text-base font-medium shadow-md hover:scale-105 hover:bg-gray-100 transition-all duration-300'
          >
            Book appointment 
            <img className='w-4' src={assets.arrow_icon} alt='Arrow Icon' />
          </a>
        </div>
  
        {/* Right side */}
        <div className='md:w-1/2 relative mt-6 md:mt-0'>
          <img
            className='w-[900px] h-[450px] rounded-lg shadow-lg md:absolute md:bottom-0'
            src={assets.header_img}
            alt='Header Image'
          />
        </div>
      </div>
    );
  }
  

