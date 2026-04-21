import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

export default function AllAppointment() {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
    const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  useEffect(() => {
    if (aToken) {
      getAllAppointments(); // Fetch all appointments when the token is available
    }
  }, [aToken]);
  const filteredAppointments = appointments.filter((item) => {
    const matchSearch =
      item.userData.name.toLowerCase().includes(search.toLowerCase()) ||
      item.docData.name.toLowerCase().includes(search.toLowerCase());

    const status = item.cancelled
      ? "Cancelled"
      : item.isCompleted
      ? "Completed"
      : "Pending";
      const matchStatus =
      statusFilter === "All" || status === statusFilter;

    return matchSearch && matchStatus;
  });
  const total = appointments.length;
  const completed = appointments.filter((a) => a.isCompleted).length;
  const cancelled = appointments.filter((a) => a.cancelled).length;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        All appointments
      </h1>
      <p className="text-gray-500 mb-6">
        Manage and track all patient appointments
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">{total}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">{completed}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-2xl font-bold text-red-600">{cancelled}</h2>
        </div>

      </div>
      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1.5fr_2.5fr_2.5fr_1.5fr_1fr] gap-6 py-3 px-6 border-b border-gray-300 text-left text-sm font-semibold text-gray-600">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-300">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1.5fr_2.5fr_2.5fr_1.5fr_1fr] gap-6 items-center bg-white p-4 shadow-md rounded-lg mt-4 hover:shadow-lg transition-shadow"
          >
            {/* Index */}
            <p className="text-gray-700 font-medium">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center space-x-4">
              <img
                src={item.userData.image}
                alt={`Patient ${item.userData.name}`}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
              />
              <div>
                <p className="font-medium text-gray-800">{item.userData.name}</p>
              </div>
            </div>

            {/* Patient Age */}
            <p className="text-gray-600">{calculateAge(item.userData.dob)} years</p>

            {/* Appointment Date & Time */}
            <p className="text-gray-600">
              {item.slotDate} <br /> {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center space-x-4">
              <img
                src={item.docData.image}
                alt={`Doctor ${item.docData.name}`}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
              />
              <p className="text-gray-800 font-medium">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-gray-600">{currency}{item.docData.fees}</p>

            {/* Actions */}
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
        ))}
      </div>
    </div>
  );
}
