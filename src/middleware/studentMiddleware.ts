import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Student from "../models/studentModel";

const secretKey = "sjtgkhakghaklhgakhhgkah";

export const authenticate = async (
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

    const decoded = jwt.verify(token, secretKey) as { studentId: string };

    const student = await Student.findById(decoded.studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
