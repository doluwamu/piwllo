import express from "express";
import signIn from "../controllers/auth/userLogin.js";
import signUp from "../controllers/auth/userRegister.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
