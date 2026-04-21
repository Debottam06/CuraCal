import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true);
  const {token,setToken,userData} = useContext(AppContext)


  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }




  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300'>
      {/* Logo */}
      <img 
        className='w-20 cursor-pointer' 
        src={assets.logo} 
        alt='logo' 
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center gap-6 font-medium'>

  <NavLink
    to="/"
    className={({ isActive }) =>
      `px-4 py-2 rounded-full ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-gray-600 hover:text-black"
      }`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/doctors"
    className={({ isActive }) =>
      `px-4 py-2 rounded-full ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-gray-600 hover:text-black"
      }`
    }
  >
    All Doctors
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      `px-4 py-2 rounded-full ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-gray-600 hover:text-black"
      }`
    }
  >
    About
  </NavLink>

  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `px-4 py-2 rounded-full ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-gray-600 hover:text-black"
      }`
    }
  >
    Contact
  </NavLink>

</ul>

      {/* Profile/Account Section */}
      <div className='flex items-center gap-4'>

  {token && userData ? (
    <div className='relative group flex items-center gap-3 cursor-pointer'>

      {/* Profile */}
      <div className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition'>

        <img
          className='w-8 h-8 rounded-full object-cover border'
          src={userData.image}
          alt='Profile'
        />

        <span className='hidden sm:block text-sm text-gray-700 font-medium'>
          {userData.name?.split(" ")[0]}
        </span>

        <img className='w-3 opacity-60' src={assets.dropdown_icon} alt='' />
      </div>

      {/* Dropdown */}
      <div className='absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg border p-2 text-sm text-gray-600 hidden group-hover:block z-20'>

        <p
          onClick={() => navigate('/my-profile')}
          className='px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition'
        >
          My Profile
        </p>

        <p
          onClick={() => navigate('/my-appointments')}
          className='px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition'
        >
          My Appointments
        </p>

        <hr className='my-2' />

        <p
          onClick={logout}
          className='px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer transition'
        >
          Logout
        </p>

      </div>

    </div>

  ) : (
    <button
      onClick={() => navigate('/login')}
      className='bg-indigo-600 text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-700 transition hidden md:block'
    >
      Create Account
    </button>
  )}

  {/* Mobile Menu */}
  <img
    onClick={() => setShowMenu(true)}
    className='w-6 md:hidden cursor-pointer'
    src={assets.menu_icon}
    alt=''
  />

</div>

      {/* Mobile Menu */}
      <div className={`${showMenu ? 'fixed' : 'hidden'} top-0 right-0 w-full h-full z-50 bg-white transition-all`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img className='w-36' src={assets.logo} alt="Logo" />
          <img 
            className='w-7 cursor-pointer' 
            onClick={() => setShowMenu(false)} 
            src={assets.cross_icon} 
            alt="Close Menu" 
          />
        </div>
        <ul className='flex flex-col items-center gap-6 mt-5 font-medium text-lg'>
          <NavLink to='/' onClick={() => setShowMenu(false)} className='hover:text-primary'>
            HOME
          </NavLink>
          <NavLink to='/doctors' onClick={() => setShowMenu(false)} className='hover:text-primary'>
            ALL DOCTORS
          </NavLink>
          <NavLink to='/about' onClick={() => setShowMenu(false)} className='hover:text-primary'>
            ABOUT
          </NavLink>
          <NavLink to='/contact' onClick={() => setShowMenu(false)} className='hover:text-primary'>
            CONTACT
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
