import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../nav/Nav";
import axios from "axios";

const ViewAllcourses = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const [coursedata,Setcoursedata]=useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchdata=async()=>{
    try {
      const res=await axios.get("http://localhost:8000/api/course/getpublished");
     
      if(res.status===200){
        console.log("the data of courses",res.data);
        Setcoursedata(res.data);
      }
    } catch (error) {
      console.log("error in getting course data",error);      
    }
  }
  useEffect(()=>{
    fetchdata()
  },[]);
  const courses = coursedata?.course || []
  const filteredCourses = courses.filter((course) => {
    const text = `
      ${course.title}
      ${course.subtitle}
      ${course.categorie}
      ${course.description}
      ${course.level}
    `.toLowerCase();

    const matchSearch = text.includes(search.toLowerCase());

    const matchCategory =
      category === "" ||
      course.categorie?.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Nav/>
      <div className="w-full flex flex-col items-center p-6">
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 mb-8 mt-20">

          <input
            type="text"
            placeholder="Search courses with AI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              px-5 py-3
              border rounded-full
              shadow-md
              focus:outline-none
              focus:ring-2 focus:ring-black
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              px-5 py-3
              border rounded-full
              shadow-md
              focus:outline-none
              focus:ring-2 focus:ring-black
            "
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>

        </div>

        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">
            No Courses Found
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredCourses.map((course) => (

              <div
                 onClick={()=>navigate("/aboutC",{
                state:course._id
              })}
                key={course._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >

                <img
                  src={course.thumnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 flex flex-col gap-2">

                  <h3 className="font-semibold text-lg">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.subtitle}
                  </p>

                  <div className="flex justify-between items-center mt-2">

                    <span className="font-bold text-lg">
                      ₹{course.price || 0}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.isPublised
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course.isPublised
                        ? "Published"
                        : "Draft"}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default ViewAllcourses;
