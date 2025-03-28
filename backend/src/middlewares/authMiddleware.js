import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Adjust path as per your structure

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied! No Token Provided." });
    }

    // Extract token after "Bearer "
    const tokenValue = token.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password from user object

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Invalid Token. Authorization Denied!" });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token!" });
  }
};

export default authMiddleware;
