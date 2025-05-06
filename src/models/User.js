import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // We can define two roles: 'user' and 'admin'
    default: "user",         // Default to 'user' unless specified
  },
  name: {
    type: String,
    required: true,
  },
});

// Create the User model from the schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
