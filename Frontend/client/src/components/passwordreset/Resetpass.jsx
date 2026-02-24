import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const Resetpass = () => {
  const locator=useLocation();
  const email=locator?.state?.email;
  const [password,Setpassword]=useState("");
  const [confirmpass,Setconfirmpass]=useState("");

  const passhandler=async(e)=>{
     e.preventDefault();
    try {
      if(password!==confirmpass){
        toast.error("password and confirm password is different");
        return
      }
      console.log(email)
      const res=await axios.post("https://lms-system-1-183s.onrender.com/api/reset/pass",{
        email:email,
        pass:password
      })
      console.log(res)
      if(res.status==200){
        toast.success("password is successfully reset");
      }
    } catch (error) {
      toast.error("password reset failed");
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className="flex flex-col   shadow-lg rounded h-100 w-[30rem] p-6 ">
            <h1 className='text-2xl font-bold text-black text-center mb-2'>Reset Password</h1>
            <p className='text-sm font-bold text-gray-600 text-center mb-2 mt-2'>Enter the below password to regain access to Your Account</p>
             <form onSubmit={passhandler} className='flex flex-col justify-center mx-10 '>
                <label htmlFor="" className='text-sm  text-gray-600 mb-2 font-bold pl-5 mt-4'>New Password</label>
                <input onChange={(e)=>Setpassword(e.target.value)} placeholder='Enter new Password' className='pl-2 border-2 w-80 ml-5 h-10 border-gray-500 rounded' type="text" />
                <label htmlFor="" className='text-sm  text-gray-600 mb-2 font-bold pl-5 mt-4'>Re-Enter New Password</label>
                <input onChange={(e)=>Setconfirmpass(e.target.value)} placeholder='Re-enter New Password' className=' pl-2 border-2 w-80 ml-5 h-10 border-gray-500 rounded' type="text" />
                <button type='submit' className='bg-black text-white w-60  mx-15 h-10 rounded mt-4'>Reset password</button>
                <Link to="/signin" className='text-center mt-4 font-bold text-gray-700'>Back to Login page</Link>
             </form>

        </div>
    </div>
  )
}

export default Resetpass
