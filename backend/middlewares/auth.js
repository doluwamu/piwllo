import jwt from "jsonwebtoken";
import AppError from "../error/appError.js";
import User from "../models/userModel.js";
import { configSettings } from "../config.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, configSettings.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return next(error);
    }
  }

  if (!token) {
    return next(new AppError("Not authorized, no token", 401));
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new AppError("Not authorized as an admin", 401));
  }
};
