import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { darkTheme } = useContext(ThemeContext);

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Theme tuggle button */}
      <div className="theme-btn-section">
        <div className="theme-btn-container">
          <ThemeToggleButton />
        </div>
      </div>

      <form className={`form-container ${darkTheme ? "dark" : "light"}`}>
        <Link to="/">
          <i className="fa-solid fa-home"></i>
        </Link>

        <h2>Sign up</h2>

        {/* <div className="avatar">
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
        </div> */}

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
            <button type="submit" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
        </div>

        <div className="form-links">
          <p>
            or <Link to={"/signin"}>sign in</Link>?
          </p>
        </div>
      </form>
    </>
  );
};

export default SignupScreen;
