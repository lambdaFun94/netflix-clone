import express from "express";
import morgan from "morgan";
import "colors";

import connectDB from "./config/db.js";
import Movie from "./models/Movie.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
connectDB();

process.env.NODE_ENV === "development" && app.use(morgan("dev"));

app.use(express.json());

// Mount route handlers
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Express is running");
});

app.get("/api/test", async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Listening in ${process.env.NODE_ENV} on ${PORT}`.cyan.dim.underline
  );
});
