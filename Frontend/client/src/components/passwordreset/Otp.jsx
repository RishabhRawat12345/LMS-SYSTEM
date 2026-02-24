import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");        
  const [forEmail, setForEmail] = useState("");


  const email = location?.state?.Email;

  useEffect(() => {
    if (email) {
      setForEmail(email);
    } else {
      toast.error("Email not found");
      navigate("/signin");
    }
  }, [email, navigate]);   

  const handlerotp = async (e) => {
    e.preventDefault();
    console.log(otp)

    try {
      const res = await axios.post(
        "https://lms-system-1-183s.onrender.com/api/reset/votp",
        {
          email: forEmail,
          otp: otp,
        }
      );
     
      if (res.status === 200) {
        toast.success("OTP Verified Successfully");
        navigate("/reset",{
          state:{
            email:email
          }
        });
      }
    } catch (error) {
      toast.error("OTP Verification Failed");
      console.log("Error in OTP verification:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col shadow-lg rounded h-80 w-[30rem] p-6">
        
        <h1 className="text-2xl font-bold text-black text-center mb-2">
          Enter OTP
        </h1>

        <form
          onSubmit={handlerotp}
          className="flex flex-col justify-center mx-10"
        >
          <label className="text-sm text-gray-600 mb-2 font-bold pl-5">
            Please Enter the 4-digit Code sent to Your Email
          </label>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border-2 w-80 ml-5 h-10 border-gray-500 rounded px-2"
            type="text"
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="bg-black text-white w-60 mt-3 mx-auto h-10 rounded"
          >
            Verify OTP
          </button>

          <Link
            to="/signin"
            className="text-center mt-4 font-bold text-gray-700"
          >
            Back to Login page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Otp;
