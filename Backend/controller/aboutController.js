import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import Stripe from "stripe";
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getaboutcourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        console.log("the course id is",req.params)
        if(!courseId){
            return res.status(400).json({message:"CourseId is not their"});
        }

        const course=await Course.findById(courseId);

        if(!course){
            return res.status(400).json({message:"course is not found"});
        }
        const lecture=await Course.findById(courseId).populate('lectures');

        return res.status(200).json({message:'data is get successfully',course,lecture})
        
    } catch (error) {
        return res.status(500).json({message:`error is come get aboutcourse ${error}`})
    }
}

export const getlecture=async(req,res)=>{
    try {
        const {id}=req.params;

        const lecture=await Lecture.findById(id);
        if(!lecture){
            return res.status(400).json({message:"lecture data is not found"})
        }
        return res.status(200).json({message:'lecture found successfully',lecture});
    } catch (error) {
        return res.status(500).json({message:`lecture error:${error}`})
    }
}

export const EnrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    // Check course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Already enrolled check
    if (course.enrolled_Student.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled",
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100, // paisa
          },
          quantity: 1,
        },
      ],

      // 🔑 Important metadata
      metadata: {
        courseId: courseId.toString(),
        userId: userId.toString(),
      },

      success_url: `http://localhost:5173/payment-success?courseId=${courseId}`,
      cancel_url: `http://localhost:5173/payment-cancel`,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log("Stripe Session Error:", error);
    return res.status(500).json({
      success: false,
      message: "Stripe session creation failed",
    });
  }
};
export const confirmEnroll = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    // Check course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Prevent duplicate enrollment
    if (course.enrolled_Student.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled",
      });
    }

    // Enroll user
    course.enrolled_Student.push(userId);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Enrollment successful",
    });

  } catch (error) {
    console.log("Confirm Enroll Error:", error);
    return res.status(500).json({
      success: false,
      message: "Enrollment failed",
    });
  }
};


export const getStudentCourse=async(req,res)=>{
  try {
    const userId=req.userId;
    console.log("the getstudent",userId);
    const course=await Course.find({
      enrolled_Student:{$in:[new mongoose.Types.ObjectId(userId)]}
    })

    if(!course){
      return res.status(404).json({message:"user is not enrolled any courses yet"});
    }

    return res.status(200).json({message:"the course data",course})
  } catch (error) {
    return res.status(500).json({message:"Internal Server error of enrolled course"});
  }
}
