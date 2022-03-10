import Task from "../../models/taskModel.js";

export const getAllUserTasks = async (req, res, next) => {
  try {
    const user = req.user;

    const tasks = await Task.find({ owner: user.id });

    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const getTaskByPriority = async (req, res, next) => {
  try {
    const { priority } = req.params;
    const user = req.user;

    const tasks = await Task.find({
      owner: user.id,
      rank: priority.toLowerCase(),
    });

    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};
