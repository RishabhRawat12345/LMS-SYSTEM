import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js"
export const ReviewCourse=async(req,res)=>{
    try {
        const userId=req.userId;
        const {courseId}=req.params;
        const {Rating,Comments}=req.body;

        if(!Rating || !Comments){
            return res.status(400).json("data is missing");
        }
        const rating=await Review.create({
            Rating,
            Comments,
            courseId,
            userId
        });

     await Course.findByIdAndUpdate(
      courseId,
      { $push: { reviews: userId } },
      { new: true }
    );

    return res.status(200).json({message:'data is get',rating})

    } catch (error) {
        return res.status(500).json({message:`Internal Server error ${error}`})
    }
} 

export const getReview=async(req,res)=>{
    try {
        const userId=req.userId;
        const reviews=await Review.find({userId:userId});
        if(!reviews){
            return res.status(400).json({message:"Reviews is not found"})
        }

        return res.status(200).json({message:"reviews is find",reviews})
    } catch (error) {
        console.log(`error in get reviews ${error}`);
    }
}