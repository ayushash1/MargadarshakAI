import { Router } from "express";
import {
  addInternship,
  getInternships,
  deleteInternship,
  updateInternship,
  recommendForUser,
  applyForInternship,
  getAllApplications,
} from "../controllers/internshipController.js";

const router = Router();

router.get("/", getInternships);
router.post("/", addInternship);
router.get("/applications", getAllApplications); // Admin only
router.put("/:id", updateInternship);
router.delete("/:id", deleteInternship);
router.post("/:id/apply", applyForInternship); // Student
router.get("/recommend/:userId", recommendForUser);

export default router;
