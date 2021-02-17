import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getFilms } from "../controllers/browseControllers.js";

const router = express.Router();

router.route("/").get(protect, getFilms);

export default router;
