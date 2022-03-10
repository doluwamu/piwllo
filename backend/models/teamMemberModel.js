import mongoose from "mongoose";
import validator from "validator";

import { constants } from "../utils/constants.js";

const { USER, TEAM } = constants;

const Schema = mongoose.Schema;

export const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Member must have a name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    isTeamAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export const leadSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Member must have a name"],
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       validate: [validator.isEmail, "Please provide a valid email"],
//     },
//     isTeamAdmin: {
//       type: Boolean,
//       required: true,
//       default: true,
//     },
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: USER,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
