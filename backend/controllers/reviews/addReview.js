import Review from "../../models/reviewModel.js";
import AppError from "../../error/appError.js";

const addReview = async (req, res, next) => {
  try {
    const { user } = req;
    const { review } = req.body;

    if (!review) {
      return next(new AppError("Plese write a review", 400));
    }

    const addedReview = new Review({
      user: user._id,
      review,
    });

    await addedReview.save();
    return res.json(addedReview);
  } catch (error) {
    return next(error);
  }
};

export default addReview;
