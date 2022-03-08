import { Router } from "express";
import createTask from "../controllers/tasks/createTask.js";
import getUserTasks from "../controllers/tasks/getUserTasks.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("", protect, createTask);
router.get("/auser", protect, getUserTasks);

export default router;
