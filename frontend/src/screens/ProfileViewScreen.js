import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const ProfileViewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="profile-view-section main">
      {/* Aside bar */}
      <AsideBar />

      {/* Profile section */}
      <div
        className={`profile-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <div className="profile-info">
          {/* Profile */}
          <div className="user-image">
            <img src="/images/avatar.jpg" alt="img" />
          </div>

          <div className="user-info">
            <div className="info user-name">
              <h3>Username:</h3>
              <p>Test1</p>
            </div>

            <div className="info user-name">
              <h3>Email:</h3>
              <p>test1@gmail.com</p>
            </div>

            <div className="btn-edit">
              <Link to={"/user/profile/edit"}>
                <button>Edit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewScreen;
