import { Router } from "express";
import createTask from "../controllers/tasks/createTask.js";
import {
  getAllUserTasks,
  getTaskByPriority,
} from "../controllers/tasks/getUserTasks.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("", protect, createTask);
router.get("/auser", protect, getAllUserTasks);
router.get("/:priority", protect, getTaskByPriority);

export default router;
