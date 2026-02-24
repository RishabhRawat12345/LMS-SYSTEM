import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";

const useUserHook = () => {
  const dispatch = useDispatch();

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`https://lms-system-1-183s.onrender.com/api/user/${id}`);
      console.log("User response:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.userdata));
      dispatch(loginSuccess(res.data.userdata));
      return res.data.userdata;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return { getUserById };
};

export default useUserHook;
