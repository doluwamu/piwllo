import express from "express";
import addReview from "../controllers/reviews/addReview.js";
import getReviews from "../controllers/reviews/getReviews.js";
import { protect, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/", protect, isAdmin, getReviews);

export default router;
