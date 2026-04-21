import mongoose from "mongoose";
import cloudinary from "../middleware/Cloudinary.js";
import Course from "../models/courseModel.js";

// @desc    Get all published courses for Students
// @route   GET /api/course/published
export const getPublishedCourses = async (req, res) => {
  try {
    // We only fetch courses where isPublished is true
    const courses = await Course.find({ isPublised: true })
      .populate("creator", "name photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// @desc    Create a new course (Creator only)
export const createCourse = async (req, res) => {
  try {
    const { title, categorie, price } = req.body;
    const creator = req.userId; // Provided by auth middleware

    if (!title || !categorie) {
      return res.status(400).json({ message: "Title and Category are required" });
    }

    const course = await Course.create({
      title,
      categorie,
      creator,
      price: price || 0,
      isPublised: false // Default to draft
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Creation failed", error: error.message });
  }
};

// @desc    Get courses created by the logged-in user
export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const creatorCourse = await Course.find({ creator: userId });

    return res.status(200).json({
      message: "Creator courses found",
      creatorCourse 
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching creator courses", error: error.message });
  }
};
