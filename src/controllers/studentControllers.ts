import { Request, Response } from "express";
import Student from "../models/studentModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "sjtgkhakghaklhgakhhgkah";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "student not found" });

    const validPass = await bcrypt.compare(password, student.password);

    if (!validPass)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ studentId: student._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewTasks = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if (!student) return res.status(404).json({ message: "Student not found" });

    const taskStatuses = student.tasks.map((task) => ({
      name: task.task,
      status: task.status,
    }));

    res.status(200).json({ taskStatuses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const student = await Student.findOne({ "tasks._id": taskId });
    if (!student) return res.status(404).json({ message: "Task not found" });

    const taskIndex = student.tasks.findIndex(
      (task) => task._id.toHexString() === taskId
    );

    if (taskIndex === -1)
      return res.status(404).json({ message: "Task not found" });

    student.tasks[taskIndex].status = status;
    await student.save();

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
