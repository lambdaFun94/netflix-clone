import { CustomError } from "../utils/CustomError.js";

export const pageNotFound = (req, res, next) => {
  throw new CustomError("Page not found", 404);
};

export const errorHandler = (err, req, res, next) => {
  let errorObject = { ...err };
  errorObject.message = err.message;
  console.error(errorObject);
  res.status(errorObject.statusCode || 500).json({
    success: false,
    error: errorObject.message || "Server Error",
    stack: process.env.NODE_ENV === "development" && errorObject.stack,
  });
};
