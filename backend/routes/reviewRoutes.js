import express from "express";
import addReview from "../controllers/reviews/addReview.js";
import getReviews from "../controllers/reviews/getReviews.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, addReview);
router.get("/", isAuthenticated, isAdmin, getReviews);

export default router;
