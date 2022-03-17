import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
};

export default getReviews;
