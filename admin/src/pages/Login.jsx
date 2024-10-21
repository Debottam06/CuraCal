import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'; // Assuming you have assets here
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

export default function Login() {
  const [state, setState] = useState('Admin');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)


    const onSubmitHandler = async(event)=>{
        event.preventDefault()

        try {
           if(state==='Admin') {
            const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token);
                
            }else{
                toast.error(data.message)
            }
           }else{
            const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
            if(data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token);
                console.log(data.token);
                
                
            }else{
              toast.error(data.message)
          }
           }
        } catch (error) {
            
        }
    }

  return (
    <form onSubmit={onSubmitHandler} action="" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-2xl font-semibold mb-6 text-center">
          <span className="text-blue-600">{state}</span> Login
        </p>
        
        {/* Email Input */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Password Input */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700">Password</p>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            required
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        {
            state === 'Admin'
            ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  );
}
