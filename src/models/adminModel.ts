import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
