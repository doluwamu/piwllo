import React, { useContext, useState } from "react";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const CreateTeamScreen = () => {
  const [teamName, setTeamName] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([]);

  console.log(members);

  const { darkTheme } = useContext(ThemeContext);

  const handleCreateTeam = (e) => {
    e.preventDefault();
  };

  const handleAddMember = () => {
    if (!member) {
      return;
    }
    setMembers([...members, member]);
    setMember("");
  };

  return (
    <div className="create-team-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`create-team-form-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        {/* Create team form */}
        <form className={`form-container ${darkTheme ? "dark" : "light"}`}>
          <h2>Create Team</h2>

          <div className="form-elements">
            <div className="form-element">
              <label>Team name:</label>
              <div className="input-element">
                <input
                  type="text"
                  name="teamname"
                  placeholder="Write here"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-element">
              <label>Add member(s):</label>
              <div className="input-element add-member">
                <input
                  type="email"
                  name="members"
                  placeholder="Enter email"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                />
                <button
                  className="btn-add"
                  type="button"
                  onClick={handleAddMember}
                >
                  Add member
                </button>

                {members &&
                  members.map((m, key) => {
                    console.log(key)
                    return (
                      <div className="added-infos" key={key}>
                        <p>{m}</p>
                        <div>x</div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="form-element">
              <button type="submit" onClick={handleCreateTeam}>
                Create team
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamScreen;
