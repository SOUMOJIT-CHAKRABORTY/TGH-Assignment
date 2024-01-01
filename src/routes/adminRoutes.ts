import express from "express";
import { addStudent, assignTask, login } from "../controllers/adminControllers";
import { authenticateAdmin } from "../middleware/authAdmin";
const adminRouter = express.Router();

adminRouter.post("/admin/login", login);
adminRouter.post("/admin/add-student", authenticateAdmin, addStudent);
adminRouter.post(
  "/admin/assign-task/:studentId",
  authenticateAdmin,
  assignTask
);

export default adminRouter;
