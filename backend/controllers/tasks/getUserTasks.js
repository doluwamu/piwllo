import Task from "../../models/taskModel.js";

const getUserTasks = async (req, res, next) => {
  try {
    const user = req.user;

    const tasks = await Task.find({ owner: user.id });
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export default getUserTasks;
