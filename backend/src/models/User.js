import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    skills: [{ type: String }],
    interests: [{ type: String }],
    education: { type: String },
    description: { type: String },
    applied: [
      {
        internshipId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Internship",
        },
        appliedAt: { type: Date, default: Date.now },
        status: { type: String, default: "pending" },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
