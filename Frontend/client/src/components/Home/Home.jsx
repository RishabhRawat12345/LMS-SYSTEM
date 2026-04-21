import React, { useEffect } from "react";
import Nav from "../nav/Nav";
import home from "../../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = ({ userdata, coursedata }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Keeping logs for debugging your props
    console.log("Home user data:", userdata);
    console.log("Home course data:", coursedata);
  }, [userdata]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* 1. Navigation */}
      <Nav />

      {/* 2. Hero Section */}
      <div className="w-full flex-1 relative">
        <div className="absolute inset-0 flex flex-col items-center text-white text-center font-bold px-4 top-5 text-2xl sm:text-3xl md:text-5xl lg:text-7xl lg:mt-20 z-10">
          <span>Grow Your Skills to Advance</span>
          <span>Your Career Path</span>
          
          <div className="flex gap-4 mt-[80%] md:mt-10 absolute lg:mt-50">
            <button 
              onClick={() => {
                // Navigates to view all courses page, passing original coursedata
                navigate("/viewc", { state: { coursedata } });
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

        {/* Background Image */}
        <img 
          src={home} 
          alt="home" 
          className="w-full h-full object-cover min-h-[500px]" 
        />
      </div>

      {/* 3. Footer (Course section logic was here and is now removed) */}
      <Footer />
    </div>
  );
};

export default Home;
