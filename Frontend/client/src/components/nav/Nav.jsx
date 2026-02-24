import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/authSlice";
import useUserHook from "../../hooks/userhooks";
const Nav = ({userdata}) => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userdata) {
      console.log("the userdata",userdata)
      setUser(userdata);
    } else {
      const stored = localStorage.getItem("user");
      const data = stored ? JSON.parse(stored) : null;
      setUser(data);
    }
  }, [userdata]);
 
  const handlelogout = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex z-50 flex-wrap justify-between items-center gap-3 p-3 sm:p-5 bg-black/80 backdrop-blur-md fixed w-full h-20">

      <div className="text-xl sm:text-2xl font-bold text-white border-2 border-white w-16 sm:w-20 text-center h-9 sm:h-10 flex items-center justify-center">
        LMS
      </div>

      <div className="flex items-center gap-2 sm:gap-4 text-white flex-wrap">

        <div className="relative">
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              onClick={() => setOpen(!open)}
              className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer rounded-full"
              alt="profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUserCircle
              onClick={() => setOpen(!open)}
              className="text-2xl sm:text-3xl cursor-pointer"
            />
          )}

          {open && (
            <div className="absolute z-50 right-0  w-36 sm:w-40 bg-black border border-white rounded-md p-3 space-y-2 mb-30">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-center border border-white rounded py-1 hover:bg-white/20 text-sm sm:text-base"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/courses")}
                className="block w-full text-center border border-white rounded py-1 hover:bg-white/20 text-sm sm:text-base"
              >
                Courses
              </button>
            </div>
          )}
        </div>

        <button onClick={()=>navigate("/dash")} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-md text-sm sm:text-base">
          Dashboard
        </button>

        <button
          onClick={handlelogout}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-md text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
