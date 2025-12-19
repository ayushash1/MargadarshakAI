import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  const { email } = req.body;
  console.log(`[auth] Register attempt for ${email}`);

  try {
    const {
      name,
      password,
      role = process.env.DEFAULT_ROLE || "student",
      skills = [],
      interests = [],
    } = req.body;

    if (!name || !email || !password) {
      console.warn(`[auth] Register failed: Missing fields for ${email}`);
      return res
        .status(400)
        .json({ message: "name, email, and password are required" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      skills,
      interests,
    });
    console.log(`[auth] User registered (DB): ${user._id}`);
    return res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error(`[auth] Register error for ${email}:`, error.message);
    // Duplicate key error code from MongoDB
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`[auth] Login attempt for ${email}`);

  try {
    if (!email || !password) {
      console.warn("[auth] Login failed: Missing email or password");
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email, password }).populate(
      "applied.internshipId"
    );
    if (user) {
      console.log(`[auth] Login successful (DB): ${user._id}`);
      return res.json({ message: "Login successful", user });
    }

    console.warn(`[auth] Login failed: Invalid credentials - ${email}`);
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(`[auth] Login error for ${email}:`, error.message);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  console.log(`[auth] Update profile attempt for user ${id}`);

  try {
    const { name, skills, interests, education, description } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    if (education) user.education = education;
    if (description) user.description = description;

    await user.save();
    // Populate here to return full object after update
    await user.populate("applied.internshipId");

    console.log(`[auth] User profile updated: ${user._id}`);
    return res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(`[auth] Update profile error for ${id}:`, error.message);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  console.log(`[auth] Fetching profile for user ${id}`);
  try {
    // CRITICAL FIX: Populate applied internships so frontend sees Role/Company
    const user = await User.findById(id).populate("applied.internshipId");

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        interests: user.interests,
        description: user.description,
        education: user.education,
        isAdmin: user.isAdmin,
        applied: user.applied,
      });
    } else {
      res.status(404); // User not found
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(`[auth] Profile fetch error:`, error.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
