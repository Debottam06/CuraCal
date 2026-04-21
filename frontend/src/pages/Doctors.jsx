import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Specialty Filters */}
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white':""}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex':'hidden sm:flex'}` }>
          <p
            onClick={() =>
              speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            Gastroenterologist
          </p>
          <p
            onClick={() =>
              speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''
            }`}
          >
            General physician
          </p>
        </div>

        {/* Doctor List */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
  {filterDoc.map(item => (
    <div
      key={item._id}
      onClick={() => navigate(`/appointment/${item._id}`)}
      className='bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group'
    >

      {/* Image */}
      <div className='bg-blue-50 h-44 flex items-center justify-center overflow-hidden'>
        <img
          src={item.image}
          alt={item.name}
          className='h-full object-cover group-hover:scale-105 transition duration-300'
        />
      </div>

      {/* Content */}
      <div className='p-4 space-y-2'>

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
        <h2 className='text-lg font-semibold text-gray-800'>
          {item.name}
        </h2>

        {/* Speciality */}
        <p className='text-sm text-gray-500'>
          {item.speciality}
        </p>

        {/* Experience */}
        <p className='text-sm text-indigo-500 font-medium'>
          {item.experience} experience
        </p>

        {/* Address */}
        <p className='text-xs text-gray-400 line-clamp-2'>
          {item.address?.line1}, {item.address?.line2}
        </p>

      </div>

      {/* Hover Bottom Action */}
      <div className='px-4 pb-4   transition duration-300'>
        <button className='w-full py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600'>
          Book Appointment
        </button>
      </div>

    </div>
  ))}
</div>
      </div>
    </div>
  );
}
