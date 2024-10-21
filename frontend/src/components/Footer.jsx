import React from 'react';
import { assets } from '../assets/assets';

export default function Footer() {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt='Logo' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          CuraCal simplifies healthcare by offering an easy-to-use platform for booking appointments with trusted doctors and managing health records, ensuring a seamless and efficient experience for users.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 7501787005</li>
            <li>debottamghosh2001@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <hr className='my-5' />
      <p className='py-5 text-sm text-center'>
        Copyright © 2024 Curacal - All Right Reserved.
      </p>
    </div>
  );
}
