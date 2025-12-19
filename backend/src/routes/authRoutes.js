import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  getUserProfile,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile/:id", updateProfile);
router.get("/profile/:id", getUserProfile);

export default router;
