import User from "../../models/userModel.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export default getUsers;
