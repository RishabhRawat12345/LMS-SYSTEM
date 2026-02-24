import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBookOpen, FaUsers, FaRupeeSign } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import StudentCourses from "./StudentCourses";

const Dashboard = ({ userdata, coursedata }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (coursedata) setCourses(coursedata);
  }, [coursedata]);

  const isEducator = userdata?.role === "educator";

  const lecturesGraphData = courses?.map((course) => ({
    name: course.title,
    lectures: course.lectures?.length || 0,
  })) || [];

  const studentsGraphData = courses?.map((course) => ({
    name: course.title,
    students: course.enrolled_Student?.length || 0,
  })) || [];

  const totalEarnings = courses?.reduce(
    (acc, course) => acc + (course.price || 0) * (course.enrolled_Student?.length || 0), 0
  ) || 0;

  const totalStudents = courses?.reduce(
    (acc, course) => acc + (course.enrolled_Student?.length || 0), 0
  ) || 0;

  const totalLectures = courses?.reduce(
    (acc, course) => acc + (course.lectures?.length || 0), 0
  ) || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-10 gap-8">
      <div className="flex flex-col gap-6 mt-16">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition w-fit"
        >
          <FaArrowLeft size={16} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
          <div className="relative">
            <img
              src={userdata?.photoUrl || ""}
              className="h-24 w-26 rounded-full object-cover ring-4 ring-gray-100"
              referrerPolicy="no-referrer"
              alt="profile"
            />
            <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex flex-col text-center md:text-left gap-2 w-full">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {userdata?.name} 👋
              </h1>
              <span className="inline-block mt-1 px-3 py-1.5 bg-black text-white text-xs rounded-full capitalize">
                {userdata?.role}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              {isEducator && (
                <button
                  onClick={() => navigate("/createCourse")}
                  className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
                >
                  + Create Course
                </button>
              )}
              <button
                onClick={() => userdata.role==='educator'? navigate("/courses"): navigate("/viewc")}
                className="px-5 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg hover:bg-gray-200 transition"
              >
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isEducator ? (
        <StudentCourses userdata={userdata} coursedata={coursedata} />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FaBookOpen className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Lectures</p>
                <p className="text-2xl font-bold text-gray-900">{totalLectures}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FaUsers className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <FaRupeeSign className="text-yellow-500" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Lectures Per Course</h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lecturesGraphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} domain={[0, 8]} tickCount={9} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="lectures" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Students Enrolled Per Course</h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentsGraphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} domain={[0, 8]} tickCount={9} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="students" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;