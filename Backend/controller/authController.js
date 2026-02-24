import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import gentoken from "../config/token.js";
import cloudnairy from "../middleware/Cloudinary.js";
import fs from "fs"

let mainemail={};
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name,email,password,role);
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
      role,
    });

    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         
      sameSite: "none",     
      maxAge: 7 * 24 * 60 * 60 * 1000,
     });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User successfully created",
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: `Signup error: ${error.message}`,
    });
  }
};


export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
     if(user){
      mainemail={
        email:email
      }
     }
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const comparepass = await bcrypt.compare(password, user.password);

    if (!comparepass) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const signout=async(req,res)=>{
    try {
        await res.clearCookies("token");
        return res.status(200).json({message:"user is successfully logout"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export const Gsignup=async(req,res)=>{
  try {
    const { name, email,  photoUrl } = req.body;
    console.log("the request of the GSignup",req.body)
    if (!email || !name||!photoUrl) {
      return res.status(400).json({
        message: "Email and role required"
      });
    }
    const newemail = email.toLowerCase();


      const user = await User.create({
        name,
        email:newemail,
        photoUrl,
      });
    
     const token=gentoken(user._id);
      res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Google signup success",
      user,
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Google signup failed"
    });
  }
}


export const roleup=async(req,res)=>{
  try {
    const {email,role}=req.body;
    console.log("the role data",req.body)
    if(!email || !role){
       res.status(400).json({message:"data is missing"});
    }

    const user=await User.findOne({email});

    user.role=role;
    await user.save()
    res.status(200).json({message:"successfully"});
  } catch (error) {
    res.status(500).json({message:"Gsignup error is coming"});
  }
}

export const GoogleSigin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }
    const newmail=email.toLowerCase()
    const user = await User.findOne({email:newmail });
    console.log("gsigin data",user)
    if (!user) {
      return res.status(404).json({
        message: "User not found. Signup first",
      });
    }
    const token=gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Signin success",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Google signin error",
    });
  }
};

export const profileupdater = async (req, res) => {
  try {
    const { name, email, bio, userId } = req.body;
    console.log("the profiledata",req.body)
    if (!req.file) {
      return res.status(400).json({
        message: "Avatar file is missing",
      });
    }

    if (!name || !email || !bio) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const result = await cloudnairy.uploader.upload(
      req.file.path,
      { folder: "profile" }
    );

    const avatarUrl = result.secure_url;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update fields
    user.name = name;
    user.email = email;
    user.bio = bio;
    user.photoUrl = avatarUrl;

    await user.save();

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Profile successfully updated",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
