import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Forgetpass = () => {
  const navigate = useNavigate();
  const [email, Setemail] = useState("");

  const sendotp = async (e) => {
    e.preventDefault();  

    try {
      const res = await axios.post(
        'https://lms-system-1-183s.onrender.com/api/reset/sentotp',
        { email }   // send as object
      );

      // success condition
      if (res.status === 200) {
        toast.success("OTP sent successfully");
        navigate("/otp",{
          state:{
            Email:email
          }
        });
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message || "Email is incorrect");
      } else {
        toast.error("Server error, try again");
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="flex flex-col shadow-lg rounded h-80 w-[30rem] p-6">
        
        <h1 className='text-2xl font-bold text-black text-center mb-6'>
          Forget Your Password ?
        </h1>

        <form
          onSubmit={sendotp}
          className='flex flex-col justify-center mx-10'
        >
          <label className='text-sm text-gray-600 mb-2 font-bold pl-5'>
            Enter your email address
          </label>

          <input
            onChange={(e) => Setemail(e.target.value)}
            className='border-2 w-80 ml-5 h-10 border-gray-500 rounded px-2'
            type="email"
            required
          />

          <button
            type="submit"
            className='bg-black text-white w-60 mt-3 mx-15 h-10 rounded'
          >
            Send OTP
          </button>

          <Link
            to="/signin"
            className='text-center mt-4 font-bold text-gray-700'
          >
            Back to Login page
          </Link>
        </form>

      </div>
    </div>
  );
};

export default Forgetpass;
