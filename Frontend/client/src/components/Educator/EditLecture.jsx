import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const EditLecture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lectureid = location?.state;

  const [form, setForm] = useState({
    lecturetitle: "",
    video: null,
    isPreviewFree: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("lecturetitle", form.lecturetitle);
    data.append("videoUrl", form.video);
    data.append("isPreviewFee", form.isPreviewFree);

    try {
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      console.log("Lecture ID:", lectureid);

      const res = await axios.post(
        `http://localhost:8000/api/course/editLec/${lectureid}`,
        data,
        {
          withCredentials: true,
          
        }
      );

      if (res.status === 200) {
        toast.success("Lecture updated successfully");
        navigate("/dash");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lecture update failed");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-gray-100">
      <div className="w-[90%] max-w-xl bg-white shadow-xl rounded-xl flex flex-col mt-24 p-6">

        <div className="flex items-center gap-6 mb-6">
          <FaArrowLeft
            onClick={() => navigate("/dash")}
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-bold">Edit Lecture</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="font-medium text-black">
              Lecture Title
            </label>
            <input
              type="text"
              value={form.lecturetitle}
              onChange={(e) =>
                setForm({ ...form, lecturetitle: e.target.value })
              }
              className="w-full h-11 border-2 rounded-lg pl-3 outline-none focus:border-black"
              placeholder="Enter lecture title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-black">
              Upload Video
            </label>

            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">

              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l-4-4m4 4l4-4"
                  />
                </svg>

                <p className="text-sm text-gray-600">
                  Click to upload video
                </p>

                <p className="text-xs text-gray-500">
                  MP4, MOV, AVI
                </p>
              </div>

              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setForm({ ...form, video: e.target.files[0] })
                }
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.isPreviewFree}
              onChange={(e) =>
                setForm({ ...form, isPreviewFree: e.target.checked })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label className="text-sm font-medium">
              Is Preview Free
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-black text-white rounded-lg font-semibold hover:bg-white hover:text-black border-2 transition"
          >
            Update Lecture
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditLecture;
