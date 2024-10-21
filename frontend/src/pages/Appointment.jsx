import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from './RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });


        // let day = currentDate.getDate()
        // let month = currentDate.month()+1
        // let year = currentDate.getFullYear()

        // const slotDate = `${day}_${month}_${year}`;
        // const slotTime = formattedTime

        // const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false :true
        // if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        // }
        

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }
  
    try {
      const date = docSlots[slotIndex][0].datetime;
  
      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is 0-based in JS
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
  
      if (!slotTime) {
        return toast.error('Please select a slot time.');
      }
      console.log(slotDate);
      
      const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
  
      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); // Refresh doctor data
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error booking appointment: ' + error.message);
    }
  };
  

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex justify-center">
            <img
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              {docInfo.name}
              <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
            </h2>
            <p className="text-lg text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <p className="mt-2 text-sm text-gray-500">Experience: {docInfo.experience} years</p>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Appointment fees: <span className="text-primary">{currencySymbol}{docInfo.fees}</span>
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">About</h3>
              <p className="text-sm text-gray-600 mt-2">{docInfo.about}</p>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800">Booking Slots</h3>
          <div className="grid grid-cols-7 gap-4 mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded-lg text-center cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  onClick={() => setSlotIndex(index)}
                >
                  <p className="text-sm font-semibold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  className={`p-2 text-center border rounded-lg cursor-pointer ${slotTime === item.time ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300"
            onClick={bookAppointment}
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}
