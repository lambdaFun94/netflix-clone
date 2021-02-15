import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["movie", "series"],
    default: "movie",
  },
  title: String,
  description: String,
  genre: String,
  maturity: String,
  slug: String,
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
