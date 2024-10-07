import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://build-d0c8u1ym2-muhammadshoaib-webs-projects.vercel.app', // Your Vercel app
    /\.vercel\.app$/, // Allow all subdomains of vercel.app
  ],
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use("/api", userRoutes);

// Connect to MongoDB
console.log("MONGO_URI: ", process.env.MONGO_URI); // Log URI to verify it's loaded

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});