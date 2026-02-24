import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateLecture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseid = location?.state;

  const [alllec, Setalllec] = useState([]);
  const [lectureTitle, setLectureTitle] = useState("");

  const fetchlecture = async () => {
    try {
      const res = await axios.get(
        ` https://lms-system-1-183s.onrender.com/api/course/getClecture/${courseid}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        const lectures = res.data?.course?.lectures || [];
        Setalllec(Array.isArray(lectures) ? lectures : []);
      }
    } catch (error) {
      console.log(`Error in to get the lecture ${error}`);
    }
  };

  useEffect(() => {
    fetchlecture();
  }, [courseid]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        ` https://lms-system-1-183s.onrender.com/api/course/lectureAdd/${courseid}`,
        { lecturetitle: lectureTitle },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const newLecture = res.data?.lecture;
        if (newLecture) {
          Setalllec((prev) => [...prev, newLecture]);
        }
        setLectureTitle("");
        toast.success("Lecture is created successfully");
      }
    } catch (error) {
      toast.error("Lecture creation failed");
    }
  };

  const handledelete = async (lectureid) => {
    try {
      const res = await axios.delete(
        ` https://lms-system-1-183s.onrender.com/api/course/removelec/${lectureid}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        Setalllec((prev) =>
          prev.filter((lec) => lec._id !== lectureid)
        );
        toast.success("Lecture delete Successfully");
      }
    } catch (error) {
      toast.error("Some error is coming");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-gray-100">
      <div className="w-[90%] max-w-xl bg-white shadow-xl rounded-xl flex flex-col mt-20 p-6">
        
        <div className="flex items-center gap-6 mb-6">
          <FaArrowLeft
            onClick={() => navigate("/dash")}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold">Create Lecture</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-black mb-1">
              Lecture Title
            </label>
            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="w-full h-10 border-2 rounded pl-3 outline-none"
            />
          </div>

          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate("/dash")}
              className="flex rounded font-bold bg-gray-400 items-center justify-center gap-2 w-40 h-10 text-black"
            >
              <FaArrowLeft />
              Back to Course
            </button>

            <button
              type="submit"
              className="flex rounded items-center justify-center gap-2 w-40 h-10 bg-black text-white hover:bg-white hover:text-black border-2"
            >
              <FaPlus />
              Create Lecture
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">
            Lecture List
          </h2>

          <div className="max-h-60 overflow-y-auto rounded p-3 flex flex-col gap-2">
            {Array.isArray(alllec) &&
              alllec.map((lec, index) => (
                <div
                  key={lec?._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span className="font-medium">
                    {index + 1}. {lec?.lecturetitle}
                  </span>

                  <span className="flex gap-4">
                    <FaEdit onClick={()=>navigate("/editl",{
                      state:lec._id
                    })} className="cursor-pointer text-gray-700 hover:text-black" />
                    <FaTrash
                      onClick={() => handledelete(lec._id)}
                      className="cursor-pointer text-red-700 hover:text-black"
                    />
                  </span>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateLecture;
