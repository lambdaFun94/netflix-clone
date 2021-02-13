import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Sign up new user
// @access  Public
// @route   POST /api/v1/auth/signup
export const signUpUser = asyncHandler(async (req, res, next) => {
  const { email, password, name, profilePicture } = req.body;

  const user = await User.create(email, password, name, profilePicture);

  if (user) {
    res.status(201).send({ success: true, data: "User successfully created!" });
  } else {
    res.status(500).send({ success: false, data: "User not created!" });
  }
});

// @desc    Login user
// @access  Public
// @route   POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isAuthenticated = await user.matchPassword(password);

  if (user && isAuthenticated) {
    res.status(200).json({ success: true, msg: "Logged in" });
  } else {
    res.status(400).json({ success: false, msg: "Not authenticated" });
  }
});
