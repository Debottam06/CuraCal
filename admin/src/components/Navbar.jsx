import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

export default function Navbar() {
    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = ()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
    return (
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
        {/* Logo and Role Section */}
        <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base">
          {/* Admin Logo */}
          <img className="w-8 sm:w-10 cursor-pointer" src={assets.admin_logo} alt="Admin Logo" />
    
          {/* Admin or Doctor Role */}
          <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {aToken ? 'Admin' : 'Doctor'}
          </p>
        </div>
    
        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-[#1E90FF] text-white text-xs sm:text-sm px-6 sm:px-10 py-2 rounded-full hover:bg-blue-600 transition-all"
        >
          Logout
        </button>
      </div>
    );
    
}
