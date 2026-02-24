import cloudinary from "../middleware/Cloudinary.js";
import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js"

export const lectureAdd = async (req, res) => {
  try {
    const { lecturetitle } = req.body;
    const { courseId } = req.params;

    console.log("Body:", req.body);
    console.log("Params:", req.params);

    if (!lecturetitle) {
      return res.status(400).json({
        message: "Lecture title is missing",
      });
    }

    if (!courseId) {
      return res.status(400).json({
        message: "Course id is missing",
      });
    }

    const newLecture = await Lecture.create({
      lecturetitle,
    });

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    course.lectures.push(newLecture._id);

    await course.save();
    await course.populate("lectures");

    return res.status(200).json({
      message: "Lecture created successfully",
      lecture: newLecture,
      course,
    });
  } catch (error) {
    console.log("Lecture Add Error:", error);
    return res.status(500).json({
      message: `Lecture server error ${error.message}`,
    });
  }
};


export const getCourselecture=async(req,res)=>{
    try {
        const {courseId}=req.params;

        if(!courseId){
            return res.status(400).json({message:"course id is missing"});
        }
        const course=await Course.findById(courseId);
        await course.populate("lectures");
        await course.save();

        return res.status(200).json({message:"the course get successfully",course});
    } catch (error) {
        return res.status(500).json({message:`error for getting coures lecture:${error}`})
    }
}

export const editLecture=async(req,res)=>{
    try {
        const {lecturetitle,isPreviewFee}=req.body;
        const {lectureid}=req.params
        if(!lectureid){
            return res.status(400).json({message:'lecture id is missing'})
        }
        if(!lecturetitle||!isPreviewFee){
            return res.status(400).json({message:"some data of editlecture is missing"});
        }
        if(!req.file){
            return res.status(400).json({message:"the video lecture not present"})
        }
        const lecture=await Lecture.findById(lectureid);
        let video;
        if(req.file){
             video=await cloudinary.uploader.upload(
                 req.file.path,
                {
                    resource_type:"video",
                    folder:"courses/video"
                }
            )
            lecture.videoUrl = video.secure_url;

        }
        if(lecturetitle){
             lecture.lecturetitle=lecturetitle;
        }
        lecture.isPreviewFee=isPreviewFee;
        await lecture.save()

      return res.status(200).json({message:'lecture is created'},lecture);
    } catch (error) {
        return res.status(500).json({message:`lecture is not edit error ${error}`})
    }
}

export const removelecture=async(req,res)=>{
    try {
          const {lectureid}=req.params;
    if(!lectureid){
        return res.status(400).json({message:"lecture id is not present"});
    }
    const lecture=await Lecture.findByIdAndDelete(lectureid);
    console.log("delete status:",lecture);
    if(!lecture){
       return res.status(400).json({message:"lecture is not found"});
    }
    const course=await Course.updateOne({
        lectures:lectureid
    },{
        $pull:{lectures:lectureid}
    })
     return res.status(200).json({message:'lecture is deleted successfully',course});
    } catch (error) {
        return res.status(500).json({message:`remove lecture error ${error}`});
    }
   
}