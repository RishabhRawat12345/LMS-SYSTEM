import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import { coursestart, getcourse } from '../redux/courseSlice';

const coursehooks = () => {
  const dispatch=useDispatch();
 
  const fetchdata=async()=>{
    try {
      dispatch(coursestart());
      const res=await axios.get("https://lms-system-1-183s.onrender.com/api/course/getCreator",{withCredentials:true});
     
      console.log("the courses is",res.data);
      dispatch(getcourse(res.data.creatorCourse))
      return res.data.creatorCourse;
    } catch (error) {
      console.log(`the course error is :${error}`);
    }
  }
  return {fetchdata}
}

export default coursehooks
