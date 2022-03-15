import React, { useContext, useState } from "react";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const ProfileEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { darkTheme } = useContext(ThemeContext);

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile-edit-section">
      {/* Aside bar */}
      <AsideBar />

      <div className={`edit-section ${darkTheme ? "dark" : "light"}`}>
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <form className={`form-container ${darkTheme ? "dark" : "light"}`}>
          <Link to="/task-manager">
            <i className="fa-solid fa-home"></i>
          </Link>

          <h2>Edit profile</h2>

          <div className="avatar">
          <label for="upload">
            <img src="/images/avatar.jpg" alt="avatar" />
          </label>

          <input
            id="upload"
            style={{ display: "none", visibility: "none" }}
            type="file"
            name=""
            value=""
          />
        </div>

          <div className="form-elements">
            <div className="form-element">
              <label>Username:</label>
              <div className="input-element">
                <input
                  type="text"
                  name="name"
                  placeholder="Write here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-element">
              <label>Email:</label>
              <div className="input-element">
                <input
                  type="email"
                  name="email"
                  placeholder="Write here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-element">
              <label>Password:</label>
              <div className="input-element">
                <input
                  type="password"
                  name="password"
                  placeholder="Write here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-element">
              <label>Confirm Password:</label>
              <div className="input-element">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Write here"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-element">
              <button type="submit" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditScreen;
