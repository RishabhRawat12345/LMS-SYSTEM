import axios from 'axios';
import { useDispatch } from 'react-redux';
import { coursestart, getcourse } from '../redux/courseSlice';

const useCourseHooks = () => { // Renamed to use... (React convention)
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(coursestart());
      const res = await axios.get("https://lms-system-1-183s.onrender.com/api/course/getCreator", {
        withCredentials: true
      });

      // Log the full response to see the structure
      console.log("Full API Response:", res.data);

      if (res.data && res.data.creatorCourse) {
        dispatch(getcourse(res.data.creatorCourse));
        return res.data.creatorCourse;
      } else {
        console.warn("Data received, but 'creatorCourse' is missing:", res.data);
      }
      
    } catch (error) {
      // Improved error logging
      console.error("Fetch Error:", error.response?.data || error.message);
    }
  };

  return { fetchData };
};

export default useCourseHooks;
