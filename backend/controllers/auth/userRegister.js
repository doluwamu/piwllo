import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";
import { generateToken } from "../../utils/token.js";

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      return next(new AppError("name is required!", 400));
    }
    if (!email) {
      return next(new AppError("email is required!", 400));
    }
    if (!password) {
      return next(new AppError("password is required!", 400));
    }
    if (!confirmPassword) {
      return next(new AppError("confirmation password is required!", 400));
    }

    if (password !== confirmPassword) {
      return next(
        new AppError("password and confirmation password don't match", 400)
      );
    }

    const foundUser = await User.findOne({ email }).lean();

    if (foundUser) {
      return next(new AppError("User with this email already exists", 401));
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
