import asyncHandler from "express-async-handler";

import User from "../models/User.js";
import { CustomError } from "../utils/CustomError.js";

// @desc    Sign up new user
// @access  Public
// @route   POST /api/v1/auth/signup
export const signUpUser = asyncHandler(async (req, res, next) => {
  const { email, password, name, profilePicture } = req.body;
  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) throw new CustomError("User already exists", 400);

  const user = await User.create({
    email,
    password,
    name,
    profilePicture,
  });
  respondWithToken(user, 201, res);
});

// @desc    Login user
// @access  Public
// @route   POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isUserAuthenticated = user && (await user.matchPassword(password));

  if (isUserAuthenticated) {
    respondWithToken(user, 200, res);
  } else {
    throw new CustomError("Login failed! Please try again.", 401);
  }
});

// Helper funnction: respond with user data and signed token
function respondWithToken(user, statusCode, res) {
  if (user) {
    res.status(statusCode).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        token: user.generateSignedJWT(),
      },
    });
  } else {
    throw new CustomError("User not created", 500);
  }
}
