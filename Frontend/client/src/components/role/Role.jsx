import React, { useState } from "react";
import { GraduationCap, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Role = () => {
  const locator=useLocation();
  const email=locator?.state?.email;
  const navigate=useNavigate();
  const rolehandler=async(val)=>{
    try {
      console.log(email);
      console.log(val);
      const res=await axios.post(" https://lms-system-1-183s.onrender.com/api/auth/roleup",{
        email:email,
        role:val
      })
      console.log(res);
      if(res.status===200){
        toast.success("role is updated successfully");
        navigate("/home")
      }
    } catch (error) {
      toast.error("role is not updated");
    }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br ">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-16 flex flex-col items-center gap-10">

        <h1 className="text-4xl font-bold text-black tracking-wide">
          Choose Your Role
        </h1>

        <div className="flex gap-10">
          <button
            
            onClick={() => rolehandler("student")}
            className="flex flex-col items-center justify-center gap-4 h-56 w-56 rounded-2xl bg-white text-black font-semibold shadow-xl hover:bg-black hover:text-white transition-all duration-300"
          >
            <User size={50} />
            Student
          </button>
          <button
            onClick={() => rolehandler("educator")}
            className="flex flex-col items-center justify-center gap-4 h-56 w-56 rounded-2xl bg-white text-black font-semibold shadow-xl hover:bg-black hover:text-white transition-all duration-300"
          >
            <GraduationCap size={50} />
            Educator
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Role;
