import AppError from "../../error/appError.js";
import Task from "../../models/taskModel.js";

const createTask = async (req, res, next) => {
  try {
    const { task, rank } = req.body;
    const user = req.user;

    if (!task) {
      return next(new AppError("task is required!", 400));
    }

    if (!rank) {
      return next(new AppError("rank is required!", 400));
    }

    const taskExists = await Task.findOne({ task });

    if (taskExists) {
      return next(new AppError("This task already exists", 400));
    }

    const taskToCreate = new Task({
      owner: user._id,
      task,
      rank,
    });

    taskToCreate.save();

    return res.status(201).json(taskToCreate);
  } catch (error) {
    return next(error);
  }
};

export default createTask;
