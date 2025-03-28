import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Define User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified

  this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
  next();
});

// Method to compare entered password with hashed password

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for authentication
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email }, // Token payload
    process.env.ACCESS_TOKEN_SECRET, // Secret key from environment variables
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Token expiration time
  );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
