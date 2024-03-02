import app from "./app.js";
import mongoose from "mongoose";

// Load environment variables from .env file

// MongoDB connection URL
const DB = process.env.MONGODB_URL;
const port  = process.env.PORT || 3001; 
// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};
connectDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));
