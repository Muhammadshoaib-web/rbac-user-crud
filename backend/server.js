import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://build-d0c8u1ym2-muhammadshoaib-webs-projects.vercel.app',
    /\.vercel\.app$/  // This will allow all subdomains on vercel.app
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Pre-flight request handling
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