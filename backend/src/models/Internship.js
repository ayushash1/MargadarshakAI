import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "Remote" },
    requiredSkills: [{ type: String }],
    description: { type: String },
    duration: { type: String },
    stipend: { type: String },
  },
  { timestamps: true }
);

export const Internship =
  mongoose.models.Internship || mongoose.model("Internship", internshipSchema);
