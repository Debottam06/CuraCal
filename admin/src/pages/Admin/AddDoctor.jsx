import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'; // Make sure assets are imported correctly
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddDoctor() {
  const [docImg, setDocImg] = useState(null); // Corrected from false to null
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));
      // formData.append('address2', address2);

      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${aToken}`, // Correct Authorization header
      //   },
      // };
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`);
        
      })

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {headers:{aToken}});
      console.log(aToken)
      console.log(data);
      

      if (data.success) {
        toast.success(data.message);
        // Reset form after success
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to add doctor. Please try again.');
    }
  };

  return (
  <form onSubmit={onSubmitHandler} className="p-6 bg-[#f6f7fb] min-h-screen w-full">
    
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold">Add doctor</h1>
      <p className="text-gray-500 text-sm">
        Fill in the details to register a new doctor to the platform
      </p>
    </div>

    {/* Card */}
    <div className="bg-white rounded-xl shadow p-6">

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-20 h-20 rounded-full border cursor-pointer"
              alt=""
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
        </div>
        <div>
          <p className="font-medium">Doctor profile</p>
          <p className="text-sm text-gray-500">
            Upload a photo and fill in credentials below
          </p>
          <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
            ● New registration
          </span>
        </div>
      </div>

      {/* BASIC INFO */}
      <h2 className="text-sm font-semibold text-gray-500 mb-3 border-b pb-2">
        BASIC INFO
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="input"
        >
          {[...Array(10).keys()].map((y) => (
            <option key={y}>{y + 1} year</option>
          ))}
        </select>
      </div>

      {/* SPECIALITY */}
      <h2 className="text-sm font-semibold text-gray-500 mb-3 border-b pb-2">
        SPECIALITY
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {[
          "General physician",
          "Gynecologist",
          "Dermatologist",
          "Pediatrician",
          "Neurologist",
          "Gastroenterologist",
        ].map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setSpeciality(item)}
            className={`px-4 py-2 rounded-lg border ${
              speciality === item
                ? "bg-blue-100 border-blue-400 text-blue-600"
                : "bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* PROFESSIONAL DETAILS */}
      <h2 className="text-sm font-semibold text-gray-500 mb-3 border-b pb-2">
        PROFESSIONAL DETAILS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder="Consultation fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Education"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="input"
        />
      </div>

      <input
        type="text"
        placeholder="Address line 1"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
        className="input mb-3"
      />

      <input
        type="text"
        placeholder="Address line 2"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        className="input mb-4"
      />

      <textarea
        placeholder="About the doctor"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="input h-24"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add doctor
        </button>
      </div>
    </div>
  </form>
);
}
