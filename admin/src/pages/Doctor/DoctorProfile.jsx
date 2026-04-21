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
  <div className="w-[900px] mx-auto p-6">

    <div className="bg-white rounded-[40px] shadow overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-8 relative rounded-t-[40px]">

        <p className="text-sm tracking-widest opacity-80">
          DOCTOR PROFILE
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Dr. {profileData.name}
        </h1>

        <p className="mt-3 bg-white/20 inline-block px-4 py-1 rounded-full text-sm">
          {profileData.degree} • {profileData.speciality}
        </p>

        {/* Experience */}
        <span className="absolute top-6 right-6 border border-white/40 px-4 py-1 rounded-full text-sm">
          {profileData.experience}
        </span>

        {/* Avatar */}
        <div className="absolute -bottom-12 right-10">
          <img src={profileData.image} alt="Doctor Profile" className="w-40 h-40 object-cover rounded-full border-2 border-gray-300" />
        </div>

      </div>

      {/* BODY */}
      <div className="p-8 pt-16 space-y-6">

        {/* Availability */}
        <div className="flex items-center justify-between">

  <div className="flex items-center gap-3 text-green-600 font-medium">
    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
    {profileData.available
      ? "Available for appointments"
      : "Not Available"}
  </div>

  {/* Toggle */}
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={profileData.available}
      onChange={() =>
        isEdit &&
        setProfileData(prev => ({
          ...prev,
          available: !prev.available
        }))
      }
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
  </label>

</div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FEES */}
          <div className="bg-gray-100 p-6 rounded-2xl">
            <p className="text-sm text-gray-500 uppercase">
              Appointment Fee
            </p>

            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))}
                  className="ml-2 bg-transparent outline-none"
                />
              ) : profileData.fees}
            </p>

            <p className="text-sm text-gray-500">
              Per consultation
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-gray-100 p-6 rounded-2xl">
            <p className="text-sm text-gray-500 uppercase">
              Address
            </p>

            {isEdit ? (
              <>
                <input
                  className="block mt-2 bg-transparent outline-none"
                  value={profileData.address.line1}
                  onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}
                />
                <input
                  className="block bg-transparent outline-none"
                  value={profileData.address.line2}
                  onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}
                />
              </>
            ) : (
              <>
                <p className="mt-2">{profileData.address.line1}</p>
                <p>{profileData.address.line2}</p>
              </>
            )}
          </div>

        </div>

        {/* ABOUT */}
        <div className="bg-gray-100 p-6 rounded-2xl">
          <p className="text-sm text-gray-500 uppercase">
            About
          </p>

          {isEdit ? (
            <textarea
              className="w-full mt-2 bg-transparent outline-none"
              value={profileData.about}
              onChange={(e)=>setProfileData(prev=>({...prev,about:e.target.value}))}
            />
          ) : (
            <p className="mt-2 text-gray-700">
              {profileData.about}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 pt-4">

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="flex-1 bg-gray-800 text-white py-3 rounded-xl"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={()=>setIsEdit(true)}
              className="flex-1 border py-3 rounded-xl hover:bg-gray-100"
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>
    </div>
  </div>
);
  
}

