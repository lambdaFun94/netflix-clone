import express from "express";
import morgan from "morgan";
import "colors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import browseRoutes from "./routes/browseRoutes.js";
import { errorHandler, pageNotFound } from "./middleware/errorHandler.js";
import { protect, authorize } from "./middleware/authMiddleware.js";

const app = express();
connectDB();

process.env.NODE_ENV === "development" && app.use(morgan("dev"));

app.use(express.json());

// Mount route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/films", browseRoutes);

// Check if running
app.get("/", (req, res) => {
  res.send("Express is running");
});

// Test route
app.get(
  "/api/test",
  protect,
  authorize(["admin", "user"]),
  async (req, res) => {
    res.send("Test page");
  }
);

app.use(pageNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Listening in ${process.env.NODE_ENV} on ${PORT}`.cyan.dim.underline
  );
});
