import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../utils/firebase";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const[role,Setrole]=useState("")
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        form,
      );

      toast.success("Signup successfully 🎉");
      navigate("/signin");

    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };
  const GoogleSignup=async()=>{
    try {
      const gauth=await signInWithPopup(auth,provider);
      console.log(gauth.user.email);
      console.log(gauth.user.displayName);
      console.log(gauth.user.photoURL);
      console.log(role)
      const res=await axios.post("http://localhost:8000/api/auth/Gsignup",{
        email:gauth.user.email,
        name:gauth.user.displayName,
        photoUrl:gauth.user.photoURL
      },{ withCredentials: true })
      console.log(res)
      if(res.status===200){
        const token=res.data.token;
        localStorage.setItem("token",token);
        const tokendata=localStorage.getItem("token");
        console.log("the token get data",tokendata);
        toast.success("signup successfully");
        navigate("/role",{
            state:{
              email:gauth.user.email,
            }
          
        });
      }
    } catch (error) {
      toast.error("Signup failed");
      console.log("the g auth error",error)
    }
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="left w-full md:w-1/2 flex flex-col items-center justify-center sm:p-[8px]">

        <h1 className="text-3xl font-bold mt-15">Let's get Started</h1>
        <p className="font-bold text-gray-500 text-xl ">Create your Account</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="flex flex-col gap-2 mt-10 w-full max-w-sm"
        >
          <label className="font-bold">Name</label>
          <input
            className="border h-10 rounded p-3"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            required
          />

          <label className="font-bold">Email</label>
          <input
            className="border h-10 rounded p-3"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
          />

          <label className="font-bold">Password</label>
          <input
            className="border h-10 rounded p-3"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            required
          />

          <button
            type="submit"
            className="h-10 w-full bg-black text-white mt-5 rounded font-bold"
          >
            Signup
          </button>
          <div className="flex justify-center items-center w-100 gap-10">
            <button onClick={()=>Setrole("student")} className="border-2 border-black rounded font-bold text-black h-10 w-30 hover:bg-black hover:text-white">Student</button>
            <button onClick={()=>Setrole("Educator")} className="border-2 border-black rounded font-bold text-black h-10 w-30 hover:bg-black hover:text-white">Educator</button>
          </div> 
        </form>

        <div className="mt-5 flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-[1px] bg-gray-400"></div>
          <span className="text-gray-500 text-sm font-medium">
            OR Continue with
          </span>
          <div className="flex-1 h-[1px] bg-gray-400"></div>
        </div>

        <button
          onClick={()=>GoogleSignup()}
          className="flex items-center justify-center gap-3 mt-3
                     border border-black bg-white 
                     h-10 w-full max-w-sm rounded"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-gray-500 text-sm mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-black font-bold underline">
            Signin
          </Link>
        </p>
      </div>

      <div className="right hidden md:block w-1/2 bg-black"></div>
    </div>
  );
};

export default Signup;
