import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const CreateCourse = ({userdata}) => {
  const navigate=useNavigate();
  useEffect(()=>{
    console.log("the create data",userdata);
  })
  const [form,Setform]=useState({
    title:"",
    categorie:"",
    price:"",
  })
  const handlecreate=async(e)=>{
     e.preventDefault();
    try {
        const res=await axios.post(" https://lms-system-1-183s.onrender.com/api/course/create",form,{
           withCredentials: true
        });
        if(res.status===200){
            toast.success("course is successfully created"); 
            navigate("/dash")
        }
    } catch (error) {
        toast.error("creating course error");
        console.log(`error is ${error}`);
    }
  }
  return (
    <div className='flex justify-center min-h-screen w-full '>
       
        <div className=" w-140 h-100 shadow-xl rounded flex flex-col mt-20">
            <div className=" flex justify-start items-center w-[100%] gap-20 p-4 lg:gap-40 md:gap-40">
             <FaArrowLeft onClick={()=>navigate("/dash")} className=''/>
             <h1 className='text-2xl font-bold'>Create Course</h1>
            </div>
             
            <form onSubmit={handlecreate} className='flex flex-col  justify-center ml-15 mt-5'>
            <label htmlFor="" className='font-medium text-black'>Course Title</label>
            <input onChange={(e)=>Setform({...form,title:e.target.value})} className='w-70 pl-4 h-10 border-2 lg:w-100 md:w-100' type="text" />
             <label htmlFor="" className='font-medium text-black'>Price</label>
            <input onChange={(e)=>Setform({...form,price:e.target.value})} className='w-70 pl-4 h-10 border-2 lg:w-100 md:w-100' type="text" />
            <label htmlFor="" className='font-medium text-black mt-3'>Category</label>
            <select onChange={(e)=>Setform({...form,categorie:e.target.value})} className='w-70 h-10 border-2 rounded px-2 lg:w-100 md:w-100 bg-white'>
              <option value="">Select Category</option>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="ai">AI / ML</option>
              <option value="cyber">Cyber Security</option>
            </select>
            <button type="submit" className='w-70 lg:w-100 md:w-100 h-10 bg-black text-white hover:bg-white hover:text-black border-2 mt-5 rounded'  >Create course</button>
            </form>
        </div>
    </div>
  )
}

export default CreateCourse
