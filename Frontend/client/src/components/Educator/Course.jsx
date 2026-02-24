import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Course = ({ coursedata = [] }) => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    setCourse(coursedata);
  }, [coursedata]);

  const handleEdit = (id) => {
    navigate("/editc", { state: id });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        ` https://lms-system-1-183s.onrender.com/api/course/deleteCourse/${id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setCourse((prev) => prev.filter((c) => c._id !== id));
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting course");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      
      <div className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex gap-4 items-center">
          <FaArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl md:text-3xl font-bold">Courses</h1>
        </div>

        <button
          onClick={() => navigate("/createCourse")}
          className="w-40 h-10 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Create Course
        </button>
      </div>

      <div className="p-5">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          
          <table className="w-full text-left border-collapse">
            
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {course.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    No Courses Found
                  </td>
                </tr>
              ) : (
                course.map((c) => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    
                    <td className="p-4">
                      <div  onClick={()=>navigate("/aboutC",{
                state:course._id
              })} className="flex items-center gap-4">
                        <img
                          src={c.thumnail}
                          alt={c.title}
                          className="w-20 h-14 object-cover rounded-md border"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {c.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {c.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      ₹{c.price || 0}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          c.isPublised
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {c.isPublised
                          ? "Published"
                          : "Not Published"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-5 text-lg">
                        
                        <FaEdit
                          onClick={() => handleEdit(c._id)}
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        />

                        <FaTrash
                          onClick={() => handleDelete(c._id)}
                          className="cursor-pointer text-red-600 hover:text-red-800"
                        />

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default Course;
