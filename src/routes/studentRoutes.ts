import { authenticate } from "../middleware/studentMiddleware";
import {
  login,
  updateTaskStatus,
  viewTasks,
} from "../controllers/studentControllers";
import express from "express";

const studentRouter = express.Router();

studentRouter.post("/student/login", login);
studentRouter.get("/student/view-tasks/:studentId", authenticate, viewTasks);
studentRouter.post(
  "/student/update-task/:taskId",
  authenticate,
  updateTaskStatus
);

export default studentRouter;
