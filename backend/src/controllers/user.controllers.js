import { User } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Check if the user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ error: "User already exists. Please log in." });
    }

    // Create user object - entry in DB (password will be hashed in the schema)
    const newUser = await User.create({ email, password });

    // Remove password from response object for security
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
    };

    res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate access token
    const accessToken = user.generateAccessToken();

    // Secure cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    // Send response with token and user details (excluding password)
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({
        message: "User logged in successfully",
        user: { _id: user._id, email: user.email },
        accessToken,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logoutUser = async (req, res) => {
  try {
    // Clear accessToken and refreshToken cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
