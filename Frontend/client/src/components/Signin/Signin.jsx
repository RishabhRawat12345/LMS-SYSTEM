import axios from 'axios'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {autoStart,loginSuccess,logoutSuccess} from "../../redux/authSlice"
import { Link, useNavigate } from 'react-router-dom'
import useUserHook from '../../hooks/userhooks'
import { signInWithPopup } from 'firebase/auth'
import { provider,auth } from '../../../utils/firebase'
import cookies from "js-cookie"
const Signin = () => {
  const {getUserById}=useUserHook()
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [form,Setform]=useState({
    email:"",
    password:"",
  })

const handlelogin = async () => {
  dispatch(autoStart());
  try {
    const res = await axios.post("https://lms-system-1-183s.onrender.com/api/auth/signin", form,  { withCredentials: true });
    const data=localStorage.getItem("token");
    const tokenset=cookies.set("token",data,{
      expires:7,
      secure:false,
    })
    console.log("cookie status of token",tokenset)
    console.log("the token data",data)
    console.log(res.data.user._id);
    console.log("the signin data token",res.data.token);
    getUserById(res.data.user._id)
    localStorage.setItem("userId", res.data.user._id);
    toast.success(res.data.message);
    dispatch(loginSuccess(res.data.user));
    navigate("/home");

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Signin failed");
    }
    console.log("Signin error:", error);
  }
};
const GoogleSignin = async () => {
  try {
    const gauth = await signInWithPopup(auth, provider);
    const res = await axios.post(
      "http://localhost:8000/api/auth/Gsignin",
      { email: gauth.user.email },
      { withCredentials: true }  
    );
    getUserById(res.data.user._id);
    localStorage.setItem("userid",res.data.user._id);
    dispatch(loginSuccess(res.data.user));

    toast.success("Google signin success");
    navigate("/home");

  } catch (error) {
    toast.error(error.response?.data?.message || "Google Signin failed");
    console.log("Google signin error:", error);
  }
};



  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
          <div className="left  w-full  md:w-1/2 flex flex-col items-center sm:p-[8px]  justify-center">
            <h1 className='text-3xl font-bold text-center flex items-center'>Welcome Back</h1>
            <p className='font-bold text-gray-500 text-xl text-center'>Login in Your Account</p>
            <form action="" className='flex flex-col gap-2 mt-10 w-full max-w-sm justify-center mx-20'>
               <label htmlFor="" className='font-bold'>Email</label>
              <input onChange={(e)=>Setform({...form,email:e.target.value})} className='border-1 border-black h-10 rounded p-3 w-full ' type="email" />
               <label htmlFor="" className='font-bold'>Password</label>
              <input onChange={(e)=>Setform({...form,password:e.target.value})} type="password" className='border-1 border-black h-10 rounded p-3 text-xl w-full' />
            </form>
            <button onClick={()=>handlelogin()} className='h-10 w-60 text-center text-white bg-black mt-5  rounded font-bold'>Signin</button>
          <div className="mt-5 flex items-center gap-4 w-full max-w-sm">
      <div className="flex-1 h-[1px] bg-gray-400"></div>
    
      <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
        OR Continue with
      </span>
      
      <div className="flex-1 h-[1px] bg-gray-400"></div>
    </div>
     <Link to="/forget" className="text-gray-500 text-sm font-medium whitespace-nowrap">
        forget your password?
      </Link>
    
    <button onClick={()=>GoogleSignin()} className="flex items-center justify-center gap-3 mt-3
                       border border-black bg-white 
                       h-10 w-full max-w-sm rounded">
      <FcGoogle size={22} />
      <span className="font-medium text-black">
        Continue with Google
      </span>
    </button>
    
         <p className="text-gray-500 text-sm font-medium text-center mt-3">
        Already have an account?  <a
        href="/"
        className="text-black font-bold hover:underline  cursor-pointer  underline h-5"
      >
        Signup
      </a>
      </p>
          </div>
          <div className="right w-[50%]  bg-black">
    
          </div>
        </div>
  )
}

export default Signin
