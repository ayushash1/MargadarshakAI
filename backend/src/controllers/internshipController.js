/**
 * internshipController.js
 *
 * Handles internship operations: lists, creation, deletion, and updates.
 * Strict MongoDB dependency.
 */

import { Internship } from "../models/Internship.js";
import { User } from "../models/User.js";

export const getInternships = async (_req, res) => {
  try {
    const internships = await Internship.find();
    return res.json({ data: internships });
  } catch (error) {
    console.error("[internshipController] getInternships failed", error);
    return res.status(500).json({ message: "Could not fetch internships" });
  }
};

export const addInternship = async (req, res) => {
  try {
    const payload = req.body;
    const { userRole } = payload;

    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can add internships" });
    }

    // Clean payload
    const { userRole: _, ...internshipData } = payload;

    const internship = await Internship.create(internshipData);
    return res.status(201).json({ message: "Internship stored", internship });
  } catch (error) {
    console.error("[internshipController] addInternship failed", error);
    return res.status(500).json({ message: "Could not add internship" });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { userRole } = payload;

    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can update internships" });
    }

    const { userRole: _, ...updateData } = payload;

    const internship = await Internship.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    return res.json({ message: "Internship updated", internship });
  } catch (error) {
    console.error("[internshipController] updateInternship failed", error);
    return res.status(500).json({ message: "Update failed" });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Internship.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Internship not found" });
    }
    return res.json({ message: "Internship deleted" });
  } catch (error) {
    console.error("[internshipController] deleteInternship failed", error);
    return res.status(500).json({ message: "Deletion failed" });
  }
};

export const recommendForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userProfile = await User.findById(userId);
    const internships = await Internship.find();

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format data for ML service
    const mlPayload = {
      student: {
        id: userProfile._id.toString(),
        skills: userProfile.skills || [],
        interests: userProfile.interests || [],
        education: userProfile.education || "",
        description: userProfile.description || "",
      },
      internships: internships.map((i) => ({
        id: i._id.toString(),
        title: i.title,
        company: i.company,
        requiredSkills: i.requiredSkills || [],
        description: i.description || "",
      })),
    };

    try {
      // Call ML Service
      const ML_SERVICE_URL =
        process.env.ML_SERVICE_URL || "http://localhost:8000";
      const mlResponse = await fetch(`${ML_SERVICE_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mlPayload),
      });

      if (!mlResponse.ok) {
        throw new Error(`ML Service error: ${mlResponse.statusText}`);
      }

      const scoredInternships = await mlResponse.json();

      // Re-order the full internship objects based on the scores
      // Create a map for quick lookup
      const internshipMap = new Map(
        internships.map((i) => [i._id.toString(), i])
      );

      const recommendations = scoredInternships
        .map((item) => {
          const original = internshipMap.get(item.internship_id);
          return original
            ? { ...original.toObject(), score: item.score }
            : null;
        })
        .filter(Boolean); // Remove any nulls if ID mismatch

      return res.json({ data: recommendations });
    } catch (mlError) {
      console.error(
        "ML Service failed, falling back to basic matching:",
        mlError
      );
      // Fallback: Return all internships (or empty list) if ML fails
      // For now, let's just return all of them mixed, or empty.
      // Better: Use the old logic? Or just return raw list.
      // Return raw list for now to keep it simple.
      return res.json({ data: internships });
    }
  } catch (error) {
    console.error("[internshipController] recommendForUser failed", error);
    return res.status(500).json({ message: "Could not build recommendations" });
  }
};

export const applyForInternship = async (req, res) => {
  try {
    const { id: internshipId } = req.params;
    const { userId } = req.body; // Assuming userId passed in body for now

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.applied.some((app) => app.internshipId.toString() === internshipId)
    ) {
      return res
        .status(400)
        .json({ message: "Already applied to this internship" });
    }

    user.applied.push({ internshipId });
    await user.save();

    return res.json({
      message: "Application submitted successfully",
      applied: user.applied,
    });
  } catch (error) {
    console.error("[internshipController] applyForInternship failed", error);
    return res.status(500).json({ message: "Application failed" });
  }
};

export const getAllApplications = async (_req, res) => {
  try {
    // Find all users who have applied for at least one internship
    const applications = await User.aggregate([
      { $match: { "applied.0": { $exists: true } } },
      { $unwind: "$applied" },
      {
        $lookup: {
          from: "internships",
          localField: "applied.internshipId",
          foreignField: "_id",
          as: "internship",
        },
      },
      { $unwind: "$internship" },
      {
        $project: {
          studentName: "$name",
          studentEmail: "$email",
          role: "$internship.title",
          company: "$internship.company",
          contact: "$email", // Using email as contact for now
          date: "$applied.appliedAt",
          status: "$applied.status",
        },
      },
    ]);

    return res.json({ data: applications });
  } catch (error) {
    console.error("[internshipController] getAllApplications failed", error);
    return res.status(500).json({ message: "Could not fetch applications" });
  }
};
