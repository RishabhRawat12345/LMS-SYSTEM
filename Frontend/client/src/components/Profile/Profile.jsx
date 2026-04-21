import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useUserHook from '../../hooks/userhooks'
import axios from 'axios'

const Profile = () => {
  const [edit, Setedit] = useState(false)
  const navigate = useNavigate();
  const { getUserById } = useUserHook();

  const [form, Setform] = useState({
    name: "",
    email: "",
    avatar: null,
    bio: ""
  })
  const [data, Setdata] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const reduxUser = JSON.parse(storedUser);
    const fetchData = async () => {
      try {
        const res = await getUserById(reduxUser._id);
        Setdata(res);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleedit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("bio", form.bio);
      formData.append("avatar", form.avatar);
      formData.append("userId", storedUser._id);

      const res = await axios.put(
        "https://lms-system-1-183s.onrender.com/api/auth/profile-updater",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Data updated successfully");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gray-200'>
      <div className={`center ${edit === false ? `h-145` : `h-167`} w-160 shadow-2xl rounded-2xl bg-white flex flex-col mt-[96px]`}>
        
        <div className="flex w-full gap-50 p-6">
          <FaArrowLeft onClick={() => navigate("/home")} className='h-7 w-7 cursor-pointer' />
          {edit && <h1 className='text-center text-2xl font-bold mx-4'>Edit Profile</h1>}
        </div>

        <div className="bottom flex flex-col justify-center w-full items-center">
          <img src={data?.photoUrl || ""} className='h-30 w-31 bg-black rounded-full object-cover' alt="profile" />

          {edit === false && (
            <>
              <h2 className='text-black text-3xl font-bold mt-10'>{data?.name || ""}</h2>
              <p className='text-gray-500 text-sm font-medium'>{data?.role || ""}</p>
            </>
          )}

          {edit === false && (
            <form className='w-[60%] flex flex-col gap-4 justify-center items-center mt-6'>
              <div className="flex items-center gap-2 w-full text-center">
                <input value={data?.email || ""} className='flex-1 h-10 rounded text-sm font-semibold outline-none' readOnly />
              </div>

           

              {/* HIDE ENROLLED COURSES IF EDUCATOR */}
              {data?.role !== "educator" && (
                <div className="flex items-center gap-2 w-full">
                  <label className='font-medium text-black w-32'>Enrolled Courses:</label>
                  <input value={data?.enrolledCourses || "0"} className='flex-1 h-10 rounded px-3 text-sm font-semibold outline-none' readOnly />
                </div>
              )}
            </form>
          )}

          {edit === false && (
            <button onClick={() => Setedit(true)} className='bg-black w-30 h-10 flex items-center justify-center mx-auto rounded text-white mt-10'>
              Edit
            </button>
          )}

          {edit && (
            <form onSubmit={handleedit} className='w-[60%] flex flex-col gap-2 mt-4'>
              <label className='text-left font-medium'>Select Avatar</label>
              <input type='file' onChange={(e) => Setform({ ...form, avatar: e.target.files[0] })} className='w-full border-2 border-gray-300 rounded-lg p-2' />

              <label className='text-left font-medium'>User Name</label>
              <input type='text' defaultValue={data?.name} onChange={(e) => Setform({ ...form, name: e.target.value })} className='w-full border-2 border-gray-300 rounded-lg p-2' />

              <label className='text-left font-medium'>Email</label>
              <input type='email' defaultValue={data?.email} onChange={(e) => Setform({ ...form, email: e.target.value })} className='w-full border-2 border-gray-300 rounded-lg p-2' />

              {/* ONLY SHOW BIO TEXTAREA IF NOT EDUCATOR */}
              {data?.role !== "educator" && (
                <>
                  <label className='text-left font-medium'>Bio</label>
                  <textarea defaultValue={data?.bio} onChange={(e) => Setform({ ...form, bio: e.target.value })} className='w-full border-2 border-gray-300 rounded-lg p-2' />
                </>
              )}

              <button type='submit' className='bg-black w-60 h-10 flex items-center justify-center mx-auto rounded text-white mt-4'>
                Save Changes
              </button>
              <button type="button" onClick={() => Setedit(false)} className="text-gray-500 text-sm mt-2">Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;
