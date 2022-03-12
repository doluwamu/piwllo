import AppError from "../../error/appError.js";
import User from "../../models/userModel.js";

// Request type: DELETE
// To: /api/v1/users/delete
// Desc: to delete all users from db(Admins Only)
const deleteAllUsers = async (req, res, next) => {
  try {
    const deleted = await User.deleteMany({});
    if (deleted) {
      return res.json({ message: "All users successfully deleted" });
    } else {
      return next(new AppError("Unable to delete users!", 404));
    }
  } catch (error) {
    return next(error);
  }
};

export default deleteAllUsers;
