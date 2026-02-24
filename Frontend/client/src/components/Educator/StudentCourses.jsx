import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaGraduationCap } from "react-icons/fa";
import axios from "axios";

const StudentCourses = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const res = await axios.get(
        "https://lms-system-1-183s.onrender.com/api/course/enrolledC",
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("user enrolled course", res.data);
        setEnrolledCourses(res.data.course || []);
      }
    } catch (error) {
      console.log("the error to getting data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Learning</h2>
          <p className="text-sm text-gray-500 mt-1">
            {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
        >
          Browse More
        </button>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
            <FaGraduationCap size={28} className="text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">No courses yet</h3>
            <p className="text-gray-500 text-sm mt-1">Start learning by enrolling in a course</p>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="mt-2 px-6 py-2.5 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              onClick={() => navigate("/aboutC", { state: course._id })}
            >
              <div className="relative">
                <img
                  src={course.thumnail}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <FaPlay className="text-black ml-1" size={14} />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 text-white text-xs rounded-full capitalize">
                  {course.level}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-gray-900 text-base leading-tight">{course.title}</h3>
                <p className="text-gray-500 text-sm">{course.categorie}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    {course.lectures?.length || 0} lectures
                  </span>
                  <span className="text-xs font-semibold text-green-600">Enrolled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
