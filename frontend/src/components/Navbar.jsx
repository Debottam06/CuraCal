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
      <ul className='hidden md:flex items-center gap-8 font-medium'>
        <NavLink to='/' className='py-1 text-xl text-[#FF6347] font-bold hover:text-primary'>
          <li >HOME</li>
        </NavLink>
        <NavLink to='/doctors' className='py-1 text-xl text-[#FF6347] font-bold hover:text-primary'>
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className='py-1 text-xl text-[#FF6347] font-bold hover:text-primary'>
          <li>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className='py-1 text-xl text-[#FF6347] font-bold hover:text-primary'>
          <li>CONTACT</li>
        </NavLink>
      </ul>

      {/* Profile/Account Section */}
      <div className='flex items-center gap-4'>
        {
          token && userData ? (
            <div className='relative group flex items-center gap-2 cursor-pointer'>
              <img className='w-8 rounded-full' src={userData.image} alt='Profile' />
              <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
              {/* Dropdown Menu */}
              <div className='min-w-48 absolute right-0 top-12 bg-stone-100 rounded-lg shadow-lg p-4 text-base font-medium text-gray-600 hidden group-hover:block z-20'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>
                  My profile
                </p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>
                  My Appointment
                </p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className='bg-primary text-white px-8 py-2 rounded-full font-light hidden md:block'>
              Create Account
            </button>
          )
        }

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden cursor-pointer' 
          src={assets.menu_icon} 
          alt='Menu' 
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
