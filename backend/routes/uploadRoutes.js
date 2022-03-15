import express from "express";
import { protect } from "../middlewares/auth.js";
import { bufferToBase64 } from "../services/dataUri.js";
import { cloudUpload } from "../services/cloudinary.js";
import CloudinaryImage from "../models/cloudinary-image.js";
import upload from "../services/multer.js";
import AppError from "../error/appError.js";

const router = express.Router();
const singleUpload = upload.single("image");

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }
    next();
  });
};

router.post("", protect, singleUploadCtrl, async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }

    const file64 = bufferToBase64(req.file);
    const result = await cloudUpload(file64.content);
    const cImage = new CloudinaryImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await cImage.save();
    return res.json({ _id: savedImage.id, url: savedImage.url });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

export default router;
