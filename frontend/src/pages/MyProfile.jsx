import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from "axios"
import { toast } from 'react-toastify';
export default function MyProfile() {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // Function to update user profile data
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address',JSON.stringify(userData.address));
      // formData.append('addressLine2', userData.address.line2);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) {
        formData.append('image', image);
      }

      const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}});

      
      if (data.success) {
       toast.success(data.message)
       loadUserProfileData()
       setIsEdit(false)
       setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to update profile:', error);
    }
  };

  return (
    userData && (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Image and Name */}
        <div className="flex items-center space-x-6">
          {isEdit ? (
            <label htmlFor="image-upload" className="relative cursor-pointer">
              <div className="relative">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <img
                  src={assets.upload_icon}
                  alt="Upload Icon"
                  className="absolute inset-0 w-8 h-8 m-auto opacity-50"
                />
              </div>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            />
          )}

          <div className="flex-1">
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <p className="text-2xl font-bold text-gray-800">{userData.name}</p>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Contact Information */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-4">Contact Information</p>
          <div className="mb-4">
            <p className="font-medium">Email ID:</p>
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{userData.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Basic Information */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-4">Basic Information</p>
          <div className="mb-4">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
          </div>
          <div className="mb-4">
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Edit or Save Button */}
        <div className="mt-6 text-right">
          {isEdit ? (
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
}
