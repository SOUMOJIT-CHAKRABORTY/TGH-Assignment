import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRoutes";
import studentRouter from "./routes/studentRoutes";
import { configDotenv } from "dotenv";
const app = express();

app.use(bodyParser.json());
configDotenv();

app.use("/api", adminRouter);
app.use("/api", studentRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen("3000", () => {
  console.log("app running on port 3000");
});
