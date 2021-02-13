import express from "express";
import { signUpUser, loginUser } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(signUpUser);

export default router;
