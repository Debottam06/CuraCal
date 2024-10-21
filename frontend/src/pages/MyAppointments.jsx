import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { toast } from 'react-toastify';

export default function MyAppointments() {
  const { backendUrl, token,getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  // Function to fetch user's appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      
      const { data } = await axios.post(backendUrl+"/api/user/cancel-appointment", { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        // Refresh the list after cancellation
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const appointmentRazorpay = async (appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl,'/api/user/payment-razorpay',{appointmentId},{ headers: { token } })
      console.log(data);
      
      if (data.success){
        console.log(data.order);
        
      }
    } catch (error) {
      
    }
  }


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Heading */}
      <p className="text-2xl font-semibold text-gray-700 mb-6">My Appointments</p>
      
      {/* Appointments List */}
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg flex flex-col lg:flex-row items-start lg:items-center gap-6">
            
            {/* Doctor Image */}
            <div className="w-32 h-32 lg:w-40 lg:h-40">
              <img 
                src={item.docData.image} 
                alt={`Doctor ${item.docData.name}`} 
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            
            {/* Doctor and Appointment Info */}
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
              <p className="text-gray-600">{item.docData.speciality}</p>
              <p className="text-gray-600 font-medium">Address:</p>
              <p className="text-gray-500">{item.docData.address.line1}</p>
              <p className="text-gray-500">{item.docData.address.line2}</p>
              <p className="text-gray-600">
                <span className="font-medium">Date & Time: </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            
            {/* Buttons Section */}
            <div className="flex space-x-4 mt-4 lg:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow-md">
                Pay here
              </button>}
              {!item.cancelled  && !item.isCompleted &&  <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
                Cancel appointment
              </button>}
              {item.cancelled &&  !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-400 rounded text-green-400'>completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
