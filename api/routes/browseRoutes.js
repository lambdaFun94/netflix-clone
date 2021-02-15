import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getFilms } from "../controllers/browseControllers.js";

const router = express.Router();

router.route("/").get(getFilms);

export default router;
