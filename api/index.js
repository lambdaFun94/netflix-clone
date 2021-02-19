import express from "express";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import "colors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import browseRoutes from "./routes/browseRoutes.js";
import { errorHandler, pageNotFound } from "./middleware/errorHandler.js";

const app = express();
connectDB();

process.env.NODE_ENV === "development" && app.use(morgan("dev"));

app.use(express.json());

// Mount security add-ons
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(rateLimit());

// Mount route handlers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/films", browseRoutes);

// Check if running
app.get("/", (req, res, next) => {
  res.send("API running");
});

// Error handling
app.use(pageNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Listening in ${process.env.NODE_ENV} on ${PORT}`.cyan.dim.underline
  );
});
