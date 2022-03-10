import Team from "../../models/teamModel.js";

const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({});
    return res.json(teams);
  } catch (error) {
    return next(error);
  }
};

export default getTeams;
