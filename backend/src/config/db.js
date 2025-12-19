import mongoose from "mongoose";

/**
 * Initialize MongoDB connection.
 * Falls back to mock data if URI missing or connection fails.
 */
export const connectDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("[db] No MONGODB_URI provided. Exiting.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("[db] Connected to MongoDB");
  } catch (error) {
    console.error("[db] Mongo connection failed.", error);
    process.exit(1);
  }
};
