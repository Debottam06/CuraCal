import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

export default function DoctorAppointments() {
    const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment} = useContext(DoctorContext)
    const {calculateAge,currency} = useContext(AppContext)
    useEffect(()=>{
        if(dToken){
            getAppointments()
        }
    },[dToken])
    return (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Table Headers */}
            <div className="grid grid-cols-7 bg-gray-200 py-2 px-4 font-semibold text-gray-600 text-center">
              <p>#</p>
              <p>Patient</p>
              <p>Payment</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p>Action</p>
            </div>
    
            {/* Mapping through Appointments */}
            {
              appointments.length > 0 ? (
                appointments.map((item, index) => (
                  <div key={index} className="grid grid-cols-7 py-4 px-4 border-b hover:bg-gray-50 transition duration-200 items-center">
                    <p className="text-center">{index + 1}</p>
                    <div className="flex items-center space-x-3">
                      <img src={item.userData.image} alt="Patient" className="w-10 h-10 rounded-full object-cover" />
                      <p>{item.userData.name}</p>
                    </div>
                    <p className="text-center border border-primary rounded-full">{item.payment ? 'Online' : 'Cash'}</p>
                    <p className="text-center">{calculateAge(item.userData.dob)} years</p>
                    <p className="text-center">{item.slotDate}  at <br />{item.slotTime}</p>
                    <p className="text-center">{currency}{item.amount}</p>
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
                <p className="text-center py-6">No appointments available</p>
              )
            }
          </div>
        </div>
      );
}
