import React from 'react';
import { assets } from '../assets/assets';

export default function Contact() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center text-3xl sm:text-4xl font-bold pt-10 text-gray-800">
        <p>
          CONTACT <span className="text-[#1E90FF]">US</span>
        </p>
      </div>

      {/* Image and Content Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start mt-12 lg:space-x-12">
        {/* Image */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Contact Info */}
        <div className="w-full lg:w-1/2 space-y-8 text-gray-700">
          {/* Office Info */}
          <div>
            <p className="text-2xl font-semibold text-gray-900">Our Office</p>
            <p className="mt-4">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p className="mt-2">Tel: +91 7501787005</p>
            <p className="mt-2">Email: debottamghosh2001@gmail.com</p>
          </div>

          {/* Careers Section */}
          <div className="mt-8">
            <b className="text-xl text-gray-900 block">Careers at CuraCal</b>
            <p className="leading-relaxed mt-2">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-6 bg-[#1E90FF] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 ease-in-out">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

