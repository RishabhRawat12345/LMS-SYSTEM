import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

// Components
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Course from "./components/Educator/Course";
import Forgetpass from "./components/passwordreset/Forgetpass";
import Otp from "./components/passwordreset/Otp";
import Resetpass from "./components/passwordreset/Resetpass";
import Role from "./components/role/Role";
import Dashboard from "./components/Educator/Dashboard";
import CreateCourse from "./components/Educator/CreateCourse";
import EditCourse from "./components/Educator/EditCourse";
import ViewAllcourses from "./components/Educator/ViewAllcourses";
import CreateLecture from "./components/Educator/CreateLecture";
import Nav from "./components/nav/Nav";
import EditLecture from "./components/Educator/EditLecture";
import AboutCourse from "./components/Educator/AboutCourse";
import Cancel from "./components/Success/Cancel"; // Check path consistency
import PaymentSuccess from "./components/Success/Success"; // Check path consistency

// Hooks - CRITICAL: Ensure filenames match these imports exactly
import useUserHook from "./hooks/userhooks"; 
import useCourseHooks from "./hooks/useCourseHooks"; 

// Redux
import { getcourse } from "./redux/courseSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Destructure hooks safely
  const { getUserById } = useUserHook();
  const { fetchData } = useCourseHooks(); // Using Capital D to match hook return

  const userid = localStorage.getItem("userid");

  // 1. Initial Data Load
  useEffect(() => {
    if (userid && typeof getUserById === "function") {
      getUserById(userid);
    }

    const saved = localStorage.getItem("courses");
    if (saved) {
      try {
        dispatch(getcourse(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse saved courses", e);
      }
    }

    // Defensive check to prevent "r is not a function" crash
    if (typeof fetchData === "function") {
      fetchData();
    }
  }, [userid, fetchData, dispatch]);

  // 2. Refresh Data on Route Change
  useEffect(() => {
    const refreshRoutes = ["/courses", "/dash"];
    if (refreshRoutes.includes(location.pathname) && typeof fetchData === "function") {
      fetchData();
    }
  }, [location.pathname, fetchData]);

  // Redux Selectors
  const userdata = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.course.course);

  // UI Logic
  const hideNavRoutes = ["/", "/signin", "/role", "/editc", "/courses", "/createl", "/aboutC", "/viewc"];
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <Nav />}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      <Routes>
        <Route path="/" element={<Signup userdata={userdata} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home userdata={userdata} coursedata={courses} />} />
        <Route path="/profile" element={<Profile userdata={userdata} />} />
        <Route path="/courses" element={<Course userdata={userdata} coursedata={courses} />} />
        <Route path="/forget" element={<Forgetpass />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset" element={<Resetpass />} />
        <Route path="/role" element={<Role />} />
        <Route path="/dash" element={<Dashboard userdata={userdata} coursedata={courses} />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/editc" element={<EditCourse />} />
        <Route path="/viewc" element={<ViewAllcourses />} />
        <Route path="/createl" element={<CreateLecture />} />
        <Route path="/editl" element={<EditLecture />} />
        <Route path="/aboutC" element={<AboutCourse userdata={userdata} />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<Cancel />} />
      </Routes>
    </>
  );
};

export default App;
