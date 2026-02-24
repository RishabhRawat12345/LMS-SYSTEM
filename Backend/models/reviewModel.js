import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    Rating: {
      type: Number,
      required: true
    },
    Comments: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Review= mongoose.model("Review", reviewSchema);

export default Review;