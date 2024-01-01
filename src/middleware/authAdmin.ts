import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Admin from "../models/adminModel";

const secretKey = "ajtgkhakghaklhgakhhgkah";

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }

    const decoded = jwt.verify(token, secretKey) as { adminId: string };

    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // req.user = { adminId: admin._id, role: admin.role };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
