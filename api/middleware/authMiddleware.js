import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { CustomError } from "../utils/CustomError.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
  } else {
    throw new CustomError("Not authorized to access this route", 401);
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (err) {
    throw new CustomError("Not authorized", 401);
  }
});

export const authorize = (...authorizedRoles) => (req, res, next) => {
  if (authorizedRoles.includes(req.user.role)) {
    next();
  } else {
    throw new CustomError("Not authorized", 401);
  }
};
