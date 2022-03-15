import mongoose from "mongoose";

import { constants } from "../utils/constants.js";

const { CLOUDINARYIMAGE } = constants;

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const CloudinaryImage = mongoose.model(CLOUDINARYIMAGE, imageSchema);

export default CloudinaryImage;
