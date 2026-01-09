
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from './../models/User.js';
import cloudinary from "../configs/cloudinary.js";


// Register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields is required...",
        success: false,
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 10);

    // create user
    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    // generate token
    const token = jwt.sign(
      { _id: createUser._id , role: createUser.role},
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(201).json({
      success: true,
      message: "User Signup successful...",
      user: createUser,
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both fields is required...'
      })
    }

    // if user not exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Sign up first...'
      });
    }

    // Match password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect...',
      });
    }

    // Generate token
    const token = jwt.sign(
      { _id: user._id , role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: 'User login successfully...',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login...",
    });
  }
}


// Logout
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({
    success: true,
    message: "Logout successful...",
  });
}

export const editProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const userId = req.user._id;

    let updateData = { firstName, lastName, bio };

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });

      updateData.photoUrl = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("EDIT PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getCurrentuser = async(req,res)=>{
  try{
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get current user...",
    });
  }
}
