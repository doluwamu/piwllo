import cloudinary from "cloudinary";
import { configSettings } from "../config.js";

const cloudinaryV2 = cloudinary.v2;

cloudinary.config({
  cloud_name: configSettings.CLOUDINARY_NAME,
  api_key: configSettings.CLOUDINARY_KEY,
  api_secret: configSettings.CLOUDINARY_SECRET,
});

export const cloudUpload = (file) => cloudinaryV2.uploader.upload(file);
