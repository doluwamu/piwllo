import { Router } from "express";
import createTask from "../controllers/tasks/createTask.js";
import editTask from "../controllers/tasks/editTask.js";
import deleteTask from "../controllers/tasks/deleteTask.js";
import {
  getAllUserTasks,
  getTaskByPriority,
} from "../controllers/tasks/getUserTasks.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("", protect, createTask);
router.get("/auser", protect, getAllUserTasks);
router.get("/:priority", protect, getTaskByPriority);
router.put("/task/:taskId", protect, editTask);
router.delete("/task/:taskId", protect, deleteTask);

export default router;
