import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { coursestart, getcourse } from '../redux/courseSlice';

const useCourseHooks = () => {
  const dispatch = useDispatch();

  // useCallback prevents the "infinite loop" crash on Vercel
  const fetchData = useCallback(async () => {
    try {
      dispatch(coursestart());
      const res = await axios.get("https://lms-system-1-183s.onrender.com/api/course/getCreator", {
        withCredentials: true
      });

      if (res?.data?.creatorCourse) {
        dispatch(getcourse(res.data.creatorCourse));
        return res.data.creatorCourse;
      }
    } catch (error) {
      console.error("Course Hook Error:", error.response?.data || error.message);
    }
  }, [dispatch]); 

  return { fetchData }; // Returning an object
};

export default useCourseHooks;
