import express from "express";
import deleteAllUsers from "../controllers/users/deleteAllUsers.js";
import deleteUser from "../controllers/users/deleteUser.js";
import getUsers from "../controllers/users/getUsers.js";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/users/userProfile.js";
import { isAdmin, protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user/profile", protect, getUserProfile);
router.put("/user/profile/edit", protect, updateProfile);
router.delete("/user/delete", protect, deleteUser);
router.delete("", protect, isAdmin, deleteAllUsers);
router.get("", protect, isAdmin, getUsers);

export default router;
