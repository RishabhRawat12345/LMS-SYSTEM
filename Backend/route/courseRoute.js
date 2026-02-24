import express from "express"
import { createCourse, deleteCourse, EditCourse, getCourse, getCourseById, getCreatorCourse } from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { editLecture, getCourselecture, lectureAdd, removelecture } from "../controller/lectureController.js";
import Course from "../models/courseModel.js";
import { confirmEnroll, EnrollCourse, getaboutcourse, getlecture, getStudentCourse } from "../controller/aboutController.js";
import { getReview, ReviewCourse } from "../controller/reviewController.js";
const Courseroute=express.Router();
//course routes
Courseroute.post("/create",isAuth,createCourse);
Courseroute.get("/getpublished",getCourse);
Courseroute.get("/getCreator",isAuth,getCreatorCourse);
Courseroute.get("/enrolledC",isAuth,getStudentCourse);
Courseroute.post("/editCourse/:courseId",isAuth,upload.single("thumnail"),EditCourse);
Courseroute.get("/getcouseId/:courseId",isAuth,getCourseById)
Courseroute.delete("/deleteCourse/:courseId",isAuth,deleteCourse);

//lecture routes

Courseroute.post("/lectureAdd/:courseId",isAuth,lectureAdd);
Courseroute.get("/getClecture/:courseId",isAuth,getCourselecture);
Courseroute.post("/editLec/:lectureid",isAuth,upload.single("videoUrl"),editLecture);
Courseroute.delete("/removelec/:lectureid",isAuth,removelecture);


//aboutcourse
Courseroute.get("/aboutC/:courseId",isAuth,getaboutcourse);
Courseroute.get("/lecture/:id",isAuth,getlecture);
Courseroute.post("/enrolled/:courseId",isAuth,EnrollCourse);


//review

Courseroute.post("/review/:courseId",isAuth,ReviewCourse);
Courseroute.get("/getreviews",isAuth,getReview);
Courseroute.post(
  "/confirm-enroll/:courseId",
  isAuth,
  confirmEnroll
);

export default Courseroute;