import React from 'react';
import { assets } from '../assets/assets';

export default function About() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center text-3xl sm:text-4xl font-bold pt-10 text-gray-800">
        <p>
          ABOUT <span className="text-[#1E90FF]">US</span>
        </p>
      </div>

      {/* Image and Content Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start mt-12 lg:space-x-12">
        {/* Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-8 text-gray-700">
          <p className="leading-relaxed text-lg">
            Welcome to <span className="font-bold text-gray-800">CuraCal</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At CuraCal, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p className="leading-relaxed text-lg">
            CuraCal is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CuraCal is here to support you every step of the way.
          </p>

          <b className="text-xl text-gray-900 block">Our Vision</b>

          <p className="leading-relaxed text-lg">
            Our vision at CuraCal is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-3xl sm:text-4xl font-bold pt-16 text-gray-800 mt-16">
        <p>
          WHY <span className="text-[#1E90FF]">CHOOSE US</span>
        </p>
      </div>

      {/* Why Choose Us Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        {/* Efficiency */}
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
          <b className="text-xl text-gray-900 block mb-3">Efficiency</b>
          <p className="leading-relaxed text-base">
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        {/* Convenience */}
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
          <b className="text-xl text-gray-900 block mb-3">Convenience</b>
          <p className="leading-relaxed text-base">
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>

        {/* Personalization */}
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
          <b className="text-xl text-gray-900 block mb-3">Personalization</b>
          <p className="leading-relaxed text-base">
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
      </div>
    </div>
  );
}

