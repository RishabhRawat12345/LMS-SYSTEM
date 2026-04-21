import React, { useEffect } from "react";
import Nav from "../nav/Nav";
import home from "../../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import Footer from "../Footer/Footer";
import CardPage from "../Educator/CardPage";
import { useNavigate } from "react-router-dom";

const Home = ({ userdata, coursedata }) => {
  const navigate = useNavigate();

  // 1. Filter data based on role
  // If user is a student, only show published courses. 
  // If no user is logged in, we usually default to showing only published courses.
  const displayCourses = userdata?.role === "student" || !userdata 
    ? coursedata?.filter(course => course.isPublised === true) 
    : coursedata;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tokensign"));
    console.log("Current User Role:", userdata?.role);
    console.log("Filtered Courses for Student:", displayCourses);
  }, [userdata, coursedata]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <div className="w-full flex-1 relative">
        <div className="absolute inset-0 flex flex-col items-center text-white text-center font-bold px-4 top-5 text-2xl sm:text-3xl md:text-5xl lg:text-7xl lg:mt-20">
          <span>Grow Your Skills to Advance</span>
          <span>Your Career Path</span>
          
          <div className="flex gap-4 mt-[80%] md:mt-10 absolute lg:mt-50">
            <button 
              onClick={() => {
                navigate("/viewc", { state: { coursedata: displayCourses } });
              }} 
              className="px-6 flex py-3 border border-black text-black text-sm md:text-lg hover:bg-white hover:text-black transition rounded lg:border-white lg:text-white gap-3"
            >
              View All Courses
              <SiViaplay className="h-5 w-5 mt-1"/>
            </button>

            <button className="px-6 py-3 bg-black text-white text-sm md:text-lg hover:bg-gray-200 transition rounded lg:bg-white lg:text-black">
              Get Started
            </button>
          </div>
        </div>
        <img src={home} alt="home" className="w-full h-full object-cover" />
      </div>

      {/* 2. Course Section - Using the filtered 'displayCourses' */}
      <div className="last w-full flex flex-col justify-center py-10 bg-gray-50">
        <h1 className="text-2xl font-bold text-center mb-6">
          {userdata?.role === "student" ? "Recommended for You" : "Our Popular Courses"}
        </h1>
        
        {displayCourses && displayCourses.length > 0 ? (
          <CardPage coursedata={displayCourses} />
        ) : (
          <p className="text-center text-gray-500">No courses available at the moment.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
