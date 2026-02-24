import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
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
import useUserHook from "./hooks/userhooks";
import usecoursehooks from "./hooks/usecoursehooks";
import { getcourse } from "./redux/courseSlice";
import EditLecture from "./components/Educator/EditLecture";
import AboutCourse from "./components/Educator/AboutCourse";
import Cancel from "../Success/Cancel";
import PaymentSuccess from "../Success/Success";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { getUserById } = useUserHook();
  const { fetchdata } = usecoursehooks();

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (userid) {
      getUserById(userid);
    }

    const saved = JSON.parse(localStorage.getItem("courses"));
    if (saved) {
      dispatch(getcourse(saved));
    }

    fetchdata();
  }, []);

  useEffect(() => {
    if (location.pathname === "/courses" || location.pathname === "/dash") {
      fetchdata();
    }
  }, [location.pathname]);

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
