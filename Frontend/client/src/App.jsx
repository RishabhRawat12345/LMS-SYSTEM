import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

// Auth & Core Components
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Role from "./components/role/Role";
import Nav from "./components/nav/Nav";

// Educator Components
import Course from "./components/Educator/Course";
import Dashboard from "./components/Educator/Dashboard";
import CreateCourse from "./components/Educator/CreateCourse";
import EditCourse from "./components/Educator/EditCourse";
import ViewAllcourses from "./components/Educator/ViewAllcourses";
import CreateLecture from "./components/Educator/CreateLecture";
import EditLecture from "./components/Educator/EditLecture";
import AboutCourse from "./components/Educator/AboutCourse";

// Password Reset
import Forgetpass from "./components/passwordreset/Forgetpass";
import Otp from "./components/passwordreset/Otp";
import Resetpass from "./components/passwordreset/Resetpass";

// Success/Cancel Components - FIXED PATHS
// Assuming these are in src/components/Success/ or src/Success/
// If they are in src/Success, use "./Success/Cancel"
import Cancel from "./components/Success/Cancel"; 
import PaymentSuccess from "./components/Success/Success";

// Hooks & Redux
import useUserHook from "./hooks/userhooks";
import usecoursehooks from "./hooks/usecoursehooks";
import { getcourse } from "./redux/courseSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Defensive destructuring
  const userHook = useUserHook();
  const courseHook = usecoursehooks();
  
  const getUserById = userHook?.getUserById;
  const fetchdata = courseHook?.fetchData || courseHook?.fetchdata;

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (userid && typeof getUserById === "function") {
      getUserById(userid);
    }

    const saved = localStorage.getItem("courses");
    if (saved) {
      try {
        dispatch(getcourse(JSON.parse(saved)));
      } catch (e) {
        console.error("Error parsing saved courses:", e);
      }
    }

    if (typeof fetchdata === "function") {
      fetchdata();
    }
  }, [userid, fetchdata, dispatch, getUserById]);

  useEffect(() => {
    const refreshRoutes = ["/courses", "/dash"];
    if (refreshRoutes.includes(location.pathname) && typeof fetchdata === "function") {
      fetchdata();
    }
  }, [location.pathname, fetchdata]);

  const userdata = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.course.course);

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
