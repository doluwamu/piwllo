import Team from "../../models/teamModel.js";
import AppError from "../../error/appError.js";

// Request type: DELETE
// To: /api/v1/teams/delete
// Desc: to delete all teams from DB(Admins Only)
const deleteTeams = async (req, res, next) => {
  try {
    const deleted = await Team.deleteMany({});
    if (deleted) {
      return res.json({ message: "Teams successfully deleted" });
    } else {
      return next(new AppError("Unable to delete teams", 404));
    }
  } catch (error) {
    return next(error);
  }
};

export default deleteTeams;
