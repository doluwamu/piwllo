import express from "express";
import createTeam from "../controllers/teams/createTeam.js";
import deleteTeams from "../controllers/teams/deleteTeams.js";
import getTeams from "../controllers/teams/getTeams.js";
import { protect, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", protect, createTeam);
router.delete("/delete", protect, isAdmin, deleteTeams);
router.get("", protect, isAdmin, getTeams);

export default router;
