import express from "express";
import createTeam from "../controllers/teams/createTeam.js";
import deleteTeams from "../controllers/teams/deleteTeams.js";
import getTeamMembers from "../controllers/teams/getTeamMembers.js";
import getUserTeams from "../controllers/teams/getUserTeams.js";
import getTeams from "../controllers/teams/getTeams.js";
import { protect, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:teamId/members", protect, getTeamMembers);
router.get("", protect, getUserTeams);
router.post("/create", protect, createTeam);
router.delete("/delete", protect, isAdmin, deleteTeams);
router.get("/all", protect, isAdmin, getTeams);

export default router;
