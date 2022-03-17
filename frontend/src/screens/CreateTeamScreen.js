import React, { useContext } from "react";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const CreateTeamScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="create-team-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`team-create-form-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamScreen;
