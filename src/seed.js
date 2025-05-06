import mongoose from "mongoose";
import User from "./models/User"; // Import your User model

const connectDb = async () => {
  if (mongoose.connections[0].readyState) return; // Check if already connected
  await mongoose.connect(process.env.MONGODB_URI);
};

const seedAdminUser = async () => {
  try {
    await connectDb();

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    // Create admin user with plain password
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // Simple password without hashing
      role: "admin",
    });

    // Save the admin user to the database
    await adminUser.save();
    console.log("Admin user seeded successfully!");
  } catch (error) {
    console.error("Error seeding admin user: ", error);
  } finally {
    mongoose.disconnect();
  }
};

seedAdminUser();
