import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

export default function DoctorDashboard() {

    const {dToken,dashData,setDashData,getDashData,cancelAppointment,completeAppointment}=useContext(DoctorContext)
    const {currency}= useContext(AppContext)
    useEffect(()=>{
        getDashData()
    },[dToken])
  return dashData && (
    <div className="container mx-auto p-6 space-y-10">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-semibold mb-8">
        <span className="text-indigo-600">Dashboard</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Doctors Card */}
        <div className="bg-white rounded-2xl p-6 shadow relative overflow-hidden">

  {/* Background circle */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-full -mr-10 -mt-10"></div>

  {/* Top section */}
  <div className="flex items-center gap-4">
    <div className="bg-indigo-100 p-3 rounded-xl">
      <img src={assets.earning_icon} className="w-8" alt="" />
    </div>
    <span className="text-indigo-500 text-lg">Revenue</span>
  </div>

  {/* Value */}
  <h2 className="text-3xl font-bold mt-4">
    {currency} {dashData.earnings }
  </h2>

  <p className="text-gray-500">Earnings</p>
</div>

        {/* Appointments Card */}
        <div className="bg-white rounded-2xl p-6 shadow relative overflow-hidden">

  {/* Background circle */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-10 -mt-10"></div>

  {/* Top */}
  <div className="flex items-center gap-4">
    <div className="bg-green-100 p-3 rounded-xl">
      <img src={assets.appointments_icon} className="w-8" alt="" />
    </div>
    <span className="text-green-500 text-lg">Today</span>
  </div>

  {/* Value */}
  <h2 className="text-3xl font-bold mt-4">
    {dashData.appointments || 0}
  </h2>

  <p className="text-gray-500">Appointments</p>
</div>

        {/* Patients Card */}
        <div className="bg-white rounded-2xl p-6 shadow relative overflow-hidden">

  {/* Background circle */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -mr-10 -mt-10"></div>

  {/* Top */}
  <div className="flex items-center gap-4">
    <div className="bg-yellow-100 p-3 rounded-xl">
      <img src={assets.patients_icon} className="w-8" alt="" />
    </div>
    <span className="text-yellow-500 text-lg">Registered</span>
  </div>

  {/* Value */}
  <h2 className="text-3xl font-bold mt-4">
    {dashData.patients || 0}
  </h2>

  <p className="text-gray-500">Patients</p>
</div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Bookings</h2>
        <div className="space-y-4">
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                <div className="flex items-center">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-indigo-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData.name}</p>
                    <p className="text-gray-500">{item.docData.slotDate}</p>
                  </div>
                </div>
                {/* Conditionally render Cancel button */}
                {
                        item.cancelled  
                        ? <p className='text-red-400 text-xs font-medium text-center'> Cancelled</p>
                        : item.isCompleted
                          ? <p className='text-green-500 text-xs font-medium text-center'>Completed</p>
                          : <div className="flex justify-center space-x-3">
                          <button className="text-red-500 hover:text-red-700 transition duration-200">
                            <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="Cancel" className="w-10 cursor-pointer" />
                          </button>
                          <button className="text-green-500 hover:text-green-700 transition duration-200">
                            <img onClick={()=>{completeAppointment(item._id)}} src={assets.tick_icon} alt="Approve" className="w-10 cursor-pointer" />
                          </button>
                        </div>
                    }
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
