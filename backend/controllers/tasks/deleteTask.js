import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await Task.findById(taskId);

    const owner = await User.findById(task.owner);

    if (user.id !== owner.id) {
      return next(new AppError("This task is not yours", 401));
    }

    await task.remove();

    return res.json({ message: "Task successfully deleted!" });
  } catch (error) {
    return next(error);
  }
};
