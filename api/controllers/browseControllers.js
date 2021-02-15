import asyncHandler from "express-async-handler";

import Movie from "../models/Film.js";
import { CustomError } from "../utils/CustomError.js";

// @desc    Fetch all movies and/or series, filtered by 'type' query param
// @access  Private - admin/user
// @url     /api/v1/films
export const getFilms = asyncHandler(async (req, res, next) => {
  const films = req.query.type
    ? await Movie.find({ type: req.query.type })
    : await Movie.find();

  if (!films.length) {
    throw new CustomError("No films found", 404);
  }

  res
    .status(200)
    .json({ success: true, numResults: films.length, data: films });
});
