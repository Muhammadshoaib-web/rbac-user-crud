import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use("/api", userRoutes);

// Connect to MongoDB
console.log("MONGO_URI: ", process.env.MONGO_URI); // Log URI to verify it’s loaded

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log('Error connecting to MongoDB:', error));
