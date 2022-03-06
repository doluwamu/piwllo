import mongoose from "mongoose";
import { constants } from "../utils/constants.js";

const { TASK, USER } = constants;

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "Please write in a task"],
    },
    rank: {
      type: String,
      required: [true, "Please rank this task"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model(TASK, taskSchema);
export default Task;
