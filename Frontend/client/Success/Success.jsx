import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  useEffect(() => {
    if (!courseId) return;

    axios.post(
      ` https://lms-system-1-183s.onrender.com/api/course/confirm-enroll/${courseId}`,
      {},
      { withCredentials: true }
    );
  }, [courseId]);

  return <h1>Payment Successful & Course Enrolled ✅</h1>;
};

export default PaymentSuccess;
