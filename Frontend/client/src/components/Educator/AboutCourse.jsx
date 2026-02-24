import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaPlay, FaLock } from "react-icons/fa";
import home1 from "../../assets/home1.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AboutCourse = ({ userdata }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location?.state;

  const [about, setAbout] = useState(null);
  const [lecture, setLecture] = useState([]);
  const [video, setVideo] = useState(null);
  const [checke, Setchecke] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [price, setprice] = useState(0);
  const [form, setForm] = useState({ Comment: "", Rating: "" });
  const [review, Setreview] = useState([]);

  const userId = userdata?._id;

  const fetchcoursedata = async () => {
    try {
      const res = await axios.get(
        ` https://lms-system-1-183s.onrender.com/api/course/aboutC/${courseId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setAbout(res.data.course);
        setLecture(res.data.lecture);
        setprice(Number(res.data.course.price));
        const isEnrolled = res.data.course.enrolled_Student.some(
          (id) => id.toString() === userId
        );
        Setchecke(isEnrolled);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/course/review/${courseId}`
      );
      if (res.status === 200) Setreview(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (courseId && userId) {
      fetchcoursedata();
      fetchReviews();
    }
  }, [courseId, userId]);

  const handleplayvideo = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/course/lecture/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) setVideo(res.data.lecture.videoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handlEnrollCourse = async (courseId) => {
    try {
      if (checke) {
        toast.error("You are already enrolled");
        return;
      }
      const res = await axios.post(
        `http://localhost:8000/api/course/enrolled/${courseId}`,
        {},
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Unable to open payment page");
    }
  };

  const handlereview = async () => {
    try {
      const payload = { Comments: form.Comment, Rating: rating, courseId };
      const res = await axios.post(
        `http://localhost:8000/api/course/review/${courseId}`,
        payload,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Review added successfully");
        fetchReviews();
        setForm({ Comment: "", Rating: "" });
        setRating(0);
      }
    } catch (error) {
      toast.error("Review adding failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-6"
        >
          <FaArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {about && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <img
              src={about?.thumnail || home1}
              alt="course"
              className="w-full h-48 md:h-72 object-cover"
            />

            <div className="p-5 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                  {about?.level}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {about?.categorie}
                </span>
              </div>

              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                {about?.title}
              </h1>

              <p className="text-gray-500 text-sm md:text-base mb-4">
                {about?.subtitle}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {about?.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      size={14}
                      color={s <= Math.round(review.reduce((a, r) => a + r.Rating, 0) / (review.length || 1)) ? "#facc15" : "#d1d5db"}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  ({review.length} Reviews)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{about?.price}
                </span>

                <button
                  onClick={() => handlEnrollCourse(about?._id)}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold transition ${
                    checke
                      ? "bg-green-500 cursor-default"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {checke ? "✓ Enrolled" : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        )}

        {checke && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-5 md:p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg">Course Curriculum</h3>
              <p className="text-sm text-gray-500 mt-1">
                {lecture?.lectures?.length || 0} lectures
              </p>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 p-4 md:p-6">
                {lecture?.lectures?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {lecture.lectures.map((lec, index) => (
                      <div
                        key={index}
                        onClick={() => handleplayvideo(lec._id)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition border border-gray-100"
                      >
                        <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center shrink-0">
                          <FaPlay className="text-white ml-0.5" size={10} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Lecture {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No lectures available</p>
                )}
              </div>

              <div className="w-full md:w-1/2 p-4 md:p-6">
                {video ? (
                  <>
                    <video
                      src={video}
                      controls
                      className="w-full rounded-xl bg-black aspect-video"
                    />
                    <p className="mt-3 font-semibold text-gray-800">{about?.title}</p>
                  </>
                ) : (
                  <div className="w-full aspect-video rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400">
                    <FaLock size={24} />
                    <p className="text-sm">Select a lecture to play</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
          <h2 className="font-bold text-lg mb-4">Write a Review</h2>

          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className="cursor-pointer transition"
                color={star <= (hover || rating) ? "#facc15" : "#d1d5db"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          <textarea
            value={form.Comment}
            onChange={(e) => setForm({ ...form, Comment: e.target.value })}
            placeholder="Share your experience with this course..."
            className="w-full border border-gray-200 rounded-xl p-4 h-28 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handlereview}
            className="mt-3 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            Submit Review
          </button>

          {review.length > 0 && (
            <div className="mt-8 flex flex-col gap-4">
              <h3 className="font-bold text-gray-800">
                Reviews ({review.length})
              </h3>
              {review.map((r, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar
                        key={s}
                        size={12}
                        color={s <= r.Rating ? "#facc15" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{r.Comments}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AboutCourse;
