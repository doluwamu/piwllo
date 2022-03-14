import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { darkTheme } = useContext(ThemeContext);

  const handleSignIn = (e) => {
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

        <h2>Sign in</h2>

        <div className="form-elements">
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
            <button type="submit" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
        </div>

        <div className="form-links">
          <p>
            or <Link to={"/signup"}>sign up</Link>?
          </p>
          <p>
            <Link to={"/forgot-password"}>Forgot password?</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SigninScreen;
