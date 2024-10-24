import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true  // Index for better search performance
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'  // Referencing the Report model
  }],
  refreshToken: {
    type: String
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

// Hash password before saving the user
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10);  // Adding salt rounds dynamically
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare entered password with stored hashed password
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

// Generate Access Token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // Environment variable for expiry
    }
  );
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY  // Environment variable for expiry
    }
  );
}

export const User = mongoose.model("User", userSchema);
