import React, { useContext, useEffect } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from './pages/Admin/AllAppointment'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

export default function App() {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  // 🔥 AUTO REDIRECT AFTER LOGIN / REFRESH
  useEffect(() => {
    if (aToken) {
      navigate('/admin-dashboard')
    } else if (dToken) {
      navigate('/doctor-dashboard')
    }
  }, [aToken, dToken])

  return aToken || dToken ? (
    <div className='bg-[#f8f9fD] min-h-screen'>
      <ToastContainer />
      <Navbar />

      <div className='flex'>
        <Sidebar />

        <div className='flex-1 p-4'>
          <Routes>

            {/* Admin Routes */}
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointment' element={<AllAppointment />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />

            {/* Doctor Routes */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />

          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}