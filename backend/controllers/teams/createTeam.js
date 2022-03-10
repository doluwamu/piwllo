import Team from "../../models/teamModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: POST
// To: /api/v1/teams/create
// Desc: to create a team
const createTeam = async (req, res, next) => {
  try {
    const user = req.user;
    const { teamname, members } = req.body;

    if (!teamname) {
      return next(new AppError("Please provide a team name", 400));
    }

    let PUsers = [];

    members.map(async (member) => {
      const PUser = await User.findOne({ email: member });

      if (!PUser) {
        return null;
      }

      const groupMembers = {
        name: PUser.name,
        email: member,
        isTeamAdmin: false,
        user: PUser._id,
      };

      PUsers.push(groupMembers);
    });

    const foundTeam = await Team.findOne({ teamname });

    if (foundTeam) {
      return next(new AppError("Team with this name already exists", 400));
    }

    const leadmember = {
      name: user.name,
      email: user.email,
      isTeamAdmin: true,
      user: user._id,
    };

    PUsers.push(leadmember);

    const team = new Team({
      teamname,
      lead: user._id,
      members: PUsers,
    });

    await team.save();

    return res.json(team);
  } catch (error) {
    return next(error);
  }
};

export default createTeam;
