import React, { useContext } from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export default function TopDoctors() {

const navigate = useNavigate();
const {doctors}=useContext(AppContext);
  return (
    <div id="top-doctors" className='flex flex-col items-center gap-6 my-16 px-4 md:px-10'>

  {/* Title */}
  <h1 className='text-3xl font-semibold text-gray-800'>
    Top Doctors to Book
  </h1>

  <p className='sm:w-1/3 text-center text-gray-500 text-sm'>
    Simply browse through our extensive list of trusted doctors.
  </p>

  {/* Cards */}
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>

    {doctors.slice(0,10).map((item,index)=>(
      <div
        key={index}
        onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
        className='bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden'
      >

        {/* Image */}
        <div className='bg-blue-50 flex justify-center items-center h-44'>
          <img
            src={item.image}
            className='h-full object-cover'
            alt=""
          />
        </div>

        {/* Content */}
        <div className='p-4'>

          {/* Availability */}
          <div className={`flex items-center gap-2 text-xs font-medium ${
            item.available ? 'text-green-500' : 'text-gray-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              item.available ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
            {item.available ? 'Available' : 'Not Available'}
          </div>

          {/* Name */}
          <h2 className='text-lg font-semibold text-gray-800 mt-2'>
            {item.name}
          </h2>

          {/* Speciality */}
          <p className='text-sm text-gray-500'>
            {item.speciality}
          </p>

        </div>
      </div>
    ))}

  </div>

  {/* Button */}
  <button
    onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
    className='mt-10 px-8 py-3 rounded-full border hover:bg-gray-100 transition'
  >
    Browse All Doctors →
  </button>

</div>
  )
}
