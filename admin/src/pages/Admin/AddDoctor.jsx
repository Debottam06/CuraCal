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
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <p className="text-2xl font-bold mb-6 text-center">Add Doctor</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} // Ensure that assets are correctly imported
                alt="Upload"
                className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-gray-500 text-sm text-center">Upload doctor picture</p>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Doctor Name */}
            <div>
              <p className="text-sm font-medium">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Doctor Email */}
            <div>
              <p className="text-sm font-medium">Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Doctor Password */}
            <div>
              <p className="text-sm font-medium">Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Experience */}
            <div>
              <p className="text-sm font-medium">Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              >
                {[...Array(10).keys()].map((year) => (
                  <option key={year + 1} value={`${year + 1} Year`}>{`${year + 1} Year`}</option>
                ))}
              </select>
            </div>

            {/* Fees */}
            <div>
              <p className="text-sm font-medium">Fees</p>
              <input
                type="number"
                placeholder="Fees"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Speciality */}
            <div>
              <p className="text-sm font-medium">Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <p className="text-sm font-medium">Education</p>
              <input
                type="text"
                placeholder="Education"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <p className="text-sm font-medium">Address</p>
              <input
                type="text"
                placeholder="Address 1"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                required
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-2 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Address 2"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <p className="text-sm font-medium">About</p>
        <textarea
          placeholder="Write about the doctor"
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          rows={5}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add Doctor
      </button>
    </form>
  );
}
