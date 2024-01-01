import express, { Request, Response } from "express";
import Admin from "../models/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel";

const secretKey = "ajtgkhakghaklhgakhhgkah";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const validPass = await bcrypt.compare(password, admin.password);

    if (!validPass)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ adminId: admin._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, department, password } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists)
      return res.status(400).json({ message: "Student already exists" });

    const passHash = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      department,
      password: passHash,
    });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const assignTask = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { task, dueTime } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.tasks.push({
      task,
      dueTime: new Date(dueTime),
    });

    await student.save();

    res.json({ message: "Task assigned successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
