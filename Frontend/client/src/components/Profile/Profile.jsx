import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useUserHook from '../../hooks/userhooks'
import axios from 'axios'
const Profile = () => {
  const [edit, Setedit] = useState(false)
  
  const navigate=useNavigate();
  const {getUserById}=useUserHook();

  const [form,Setform]=useState({
    name:"",
    email:"",
    avatar:null,
    bio:""
  })
  const [data,Setdata]=useState();
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    console.log("No user found in localStorage");
    return;
  }

  const reduxUser = JSON.parse(storedUser);
  console.log("User from localStorage:", reduxUser);

  const fetchData = async () => {
    try {
      const res = await getUserById(reduxUser._id);

      console.log("API Response:", res);

      // If your hook returns res.data
      Setdata(res);
      
      // If returns {user: {...}}
      // Setdata(res.user);

    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  fetchData();
}, []);

 useEffect(()=>{
  console.log(data)
 })

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

    console.log("Profile update data:", formData);

    const res = await axios.put(
      "http://localhost:8000/api/auth/profile-updater",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success("Data updated successfully");
      navigate("/home");
    }

  } catch (error) {
    console.log(error);
    toast.error("Update failed");
  }
};


  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gray-200'>

      <div className={`center ${edit===false?`h-145`:`h-167`} w-160 shadow-2xl rounded-2xl bg-white flex flex-col mt-[96px]`}>

        <div className="flex w-full gap-50 p-6">
          <FaArrowLeft onClick={()=>navigate("/home")} className='h-7 w-7' />
          {edit===true&&(<h1 className='text-center text-2xl font-bold mx-4'>
            Edit Profile
          </h1>)}
        </div>

        <div className="bottom flex flex-col justify-center w-full items-center">

          <img src={data?.photoUrl||""} className='h-30 w-31 bg-black rounded-full' />

         {edit===false && (<input
            value={data?.name||""}
            className='w-30 h-10 flex items-center justify-center mx-auto rounded text-black text-3xl font-bold mt-10'
            type='text'
          />)}

          {edit===false &&(<input
            value={data?.role||""}
            className='w-30 h-10 flex items-center justify-center rounded text-gray-500 text-sm text-center font-medium'
            type='text'
          />)}

         { edit===false && ( <form className='w-[60%] flex flex-col gap-4 justify-center items-center ml-20'>

            <div className="flex items-center gap-2 w-full">
              <label className='font-medium text-black'>
                Email:
              </label>

              <input
                value={data?.email||""}
                className='flex-1 h-10 rounded text-sm font-semibold'
                type='text'
                readOnly
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <label className='font-medium text-black'>
                Bio:
              </label>

              <input
                value={data?.bio||""}
                className='flex-1 h-10 rounded px-3 text-sm font-semibold'
                type='text'
                readOnly
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <label className='font-medium text-black'>
                Enrolled Courses:
              </label>

              <input
                value={data?.enrolledCourses||"0"}
                className='flex-1 h-10 rounded px-3 text-sm font-semibold'
                type='text'
                readOnly
              />
            </div>

          </form>)}

          {edit===false&&(<button
            onClick={() => Setedit(!edit)}
            className='bg-black w-30 h-10 flex items-center justify-center mx-auto rounded text-white mt-10'
          >
            Edit
          </button>)}

          {edit && (

            <form onSubmit={handleedit} className='w-[60%] flex flex-col gap-2'>

              <label className='text-left font-medium'>
                Select Avatar
              </label>

              <input
                onChange={(e)=>{
                  Setform({...form,avatar:e.target.files[0]})
                }}
                className='w-full border-2 border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800'
                type='file'
              />

              <label className='text-left font-medium'>
                User Name
              </label>

              <input
                onChange={(e)=>{
                  Setform({...form,name:e.target.value})
                }}
                className='w-full border-2 border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800'
                type='text'
              />

              <label className='text-left font-medium'>
                Email
              </label>

              <input
              onChange={(e)=>Setform({...form,email:e.target.value})}
                className='w-full border-2 border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800'
                type='email'
              />

              <label className='text-left font-medium'>
                Bio
              </label>

              <textarea
                onChange={(e)=>{Setform({...form,bio:e.target.value})}}
                className='w-full border-2 border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800'
              />

              <button type='submit' className='bg-black w-60 h-10 flex items-center justify-center mx-auto rounded text-white'>
                Save Changes
              </button>

            </form>

          )}

        </div>
      </div>
    </div>
  )
}

export default Profile
