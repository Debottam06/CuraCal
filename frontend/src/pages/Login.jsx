import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Login() {

  const {backendUrl,token,setToken} = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Submit logic goes here

    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,password,email})
          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }else{
            toast.error(data.message)
          }
        
      }else{
        const {data} = await axios.post(backendUrl+'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Form Header */}
        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-800 text-center">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-sm text-gray-600 text-center mt-1">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
          </p>
        </div>

        {/* Name Input (Only for Sign Up) */}
        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Full Name:</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Password:</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300 ease-in-out"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle Between Sign Up and Login */}
        <div className="mt-4 text-center text-gray-600">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-primary cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-primary cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
