import express from "express";
import createTeam from "../controllers/teams/createTeam.js";
import getTeams from "../controllers/teams/getTeams.js";
import { protect, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", protect, createTeam);
router.get("", protect, isAdmin, getTeams);

export default router;
