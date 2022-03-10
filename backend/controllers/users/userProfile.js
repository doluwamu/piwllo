import AppError from "../../error/appError.js";
import User from "../../models/userModel.js";
import validator from "validator";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const profile = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (user) {
      if (!validator.isEmail(email)) {
        return next(new AppError("Please provide a valid email", 400));
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;

      await user.save();

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return next(new AppError("User doesn't exist", 400));
    }
  } catch (error) {
    return next(error);
  }
};
