import React from "react";
import { useNavigate } from "react-router-dom";
const CardPage = ({ coursedata }) => {
  const navigate=useNavigate();
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coursedata.length === 0 ? (
          <p>No Popular Courses Found</p>
        ) : (
          coursedata.map((course) => (
            
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
          ))
        )}

      </div>
    </div>
  );
};

export default CardPage;
