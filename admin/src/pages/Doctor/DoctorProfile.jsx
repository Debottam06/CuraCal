import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function DoctorProfile() {
  const {dToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
  const {currency}=useContext(AppContext)

  const [isEdit,setIsEdit]=useState(false)

  const updateProfile = async()=>{
    try {
      const updateData = {
        address : profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data}= await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProfileData()
  },[dToken])
  return profileData && (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <img
            src={profileData.image}
            alt="Doctor Profile"
            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
          />
        </div>
  
        {/* Profile Information Section */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          {/* Name and Basic Info */}
          <p className="text-2xl font-bold text-gray-800">{profileData.name}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm mt-2 sm:mt-0">
              {profileData.experience}
            </button>
          </div>
  
          {/* About Section */}
          <div className="mt-4">
            <p className="font-semibold text-gray-700">About :</p>
            <p className="text-gray-600">{profileData.about}</p>
          </div>
  
          {/* Appointment Fee */}
          <p className="text-lg font-semibold text-gray-800 mt-4">
            Appointment fee: <span className="text-blue-600">{currency}{isEdit ? <input type="number" onChange={(e)=>{setProfileData(prev=>({...prev,fees :e.target.value}))}} value={profileData.fees}/> : profileData.fees}</span>
          </p>
  
          {/* Address Section */}
          <div className="mt-4">
            <p className="font-semibold text-gray-700">Address :</p>
            <p className="text-gray-600">{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} /> : profileData.address.line1}</p>
            <p className="text-gray-600">{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} /> : profileData.address.line2}</p>
          </div>
  
          {/* Availability Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))}
              checked={profileData.available}
              id="availability"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="availability" className="ml-2 text-gray-700">Available</label>
          </div>
  
          {/* Edit Button */}
          {
            isEdit
            ? <button onClick={updateProfile} className="mt-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            Save
          </button>
          : <button onClick={()=>setIsEdit(true)} className="mt-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
          Edit
        </button>
          }
        </div>
      </div>
    </div>
  );
  
}

