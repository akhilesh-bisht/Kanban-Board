import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log("🔍 Raw Token Received:", token); // Debugging

    if (!token) {
      return res
        .status(401)
        .json({ message: "❌ Unauthorized: No token provided" });
    }

    // Ensure token starts with 'Bearer '
    if (!token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message:
            "❌ Unauthorized: Invalid token format (must start with 'Bearer ')",
        });
    }

    token = token.split(" ")[1]; // Extract the actual token
    console.log("✅ Extracted Token:", token); // Debugging

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("✅ Decoded Token:", decoded); // Debugging

    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "❌ User not found" });
    }

    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message); // Debugging
    res.status(401).json({ message: "❌ Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
