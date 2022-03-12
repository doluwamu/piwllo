import User from "../../models/userModel";

// Request type: DELETE
// To: /api/v1/users/delete
// Desc: to delete all users from db(Admins Only)
const deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    return res.json({ message: "All users successfully deleted" });
  } catch (error) {
    return next(error);
  }
};

export default deleteAllUsers;
