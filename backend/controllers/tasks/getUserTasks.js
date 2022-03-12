import Task from "../../models/taskModel.js";

// Request type: GET
// To: /api/v1/tasks/auser
// Desc: to get all tasks for an authorized user
export const getAllUserTasks = async (req, res, next) => {
  try {
    const user = req.user;

    const tasks = await Task.find({ owner: user.id });

    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

// Request type: GET
// To: /api/v1/tasks/:priority
// Desc: to get all tasks by their priority ranking
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
