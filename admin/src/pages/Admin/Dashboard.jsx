import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

export default function Dashboard() {
  const { getDashData, aToken, dashData, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="container mx-auto p-6 space-y-10">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Doctors Card */}
        <div className="bg-indigo-100 shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
          <img src={assets.doctor_icon} alt="Doctors" className="w-16 h-16 mr-4" />
          <div>
            <p className="text-3xl font-bold text-indigo-900">{dashData.doctors || 0}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-green-100 shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
          <img src={assets.appointments_icon} alt="Appointments" className="w-16 h-16 mr-4" />
          <div>
            <p className="text-3xl font-bold text-green-900">{dashData.appointments || 0}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-yellow-100 shadow-lg rounded-xl p-6 flex items-center hover:shadow-2xl transition-shadow duration-300">
          <img src={assets.patients_icon} alt="Patients" className="w-16 h-16 mr-4" />
          <div>
            <p className="text-3xl font-bold text-yellow-900">{dashData.patients || 0}</p>
            <p className="text-gray-600">Patients</p>
          </div>
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
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-indigo-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.docData.name}</p>
                    <p className="text-gray-500">{item.docData.slotDate}</p>
                  </div>
                </div>
                {/* Conditionally render Cancel button */}
                {item.cancelled 
              ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
              : item.isCompleted 
              ? <p className="text-green-500 text-xs font-medium">Completed</p> :(
                <div className="flex space-x-4">
                  <img
                    onClick={() => cancelAppointment(item._id)} // Wrap the function in an anonymous function
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-10 cursor-pointer"
                  />
                </div>
              )
            }
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
