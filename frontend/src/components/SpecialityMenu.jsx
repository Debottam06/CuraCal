import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom';
export default function SpecialityMenu() {
  return (
    <div className='flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-50' id='speciality'>
      {/* Title */}
      <h1 className='text-3xl font-semibold'>Find by Speciality</h1>

      {/* Description */}
      <p className='sm:w-2/5 text-center text-sm text-gray-600'>
        Browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>

      {/* Speciality List */}
      <div className='flex sm:justify-center gap-6 pt-6 w-full overflow-x-auto px-4'>
        {specialityData.map((item, index) => (
          <Link 
            onClick={() => scrollTo(0, 0)} 
            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 ease-in-out' 
            key={index} 
            to={`/doctors/${item.speciality}`}
          >
            {/* Speciality Image */}
            <img className='w-20 sm:w-28 mb-3 rounded-full shadow-md' src={item.image} alt={item.speciality} />
            
            {/* Speciality Name */}
            <p className='text-gray-700 font-medium'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

