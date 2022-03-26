import React, { useState, useContext } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  const { darkTheme } = useContext(ThemeContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, success, error } = userLogin;

  const location = useLocation();
  const { message } = location.state || "";

  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailRequiredError(true);
      return;
    }

    if (!password) {
      setPasswordRequiredError(true);
      return;
    }

    dispatch(loginUser(email, password));
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
        {message && <Alert message={message} iconName="fa-solid fa-check" />}

        {error && (
          <Alert
            bgColor={"red"}
            color={"red"}
            iconName={"fa-solid fa-xmark"}
            message={error}
          />
        )}

        {success && <Navigate to="/task-manager" />}

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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (email && emailRequiredError) {
                    setEmailRequiredError(false);
                  }
                }}
              />
              <p
                style={{
                  display: emailRequiredError ? "block" : "none",
                  color: "red",
                }}
              >
                *This field is required
              </p>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (password && passwordRequiredError) {
                    setPasswordRequiredError(false);
                  }
                }}
              />
              <p
                style={{
                  display: passwordRequiredError ? "block" : "none",
                  color: "red",
                }}
              >
                *This field is required
              </p>
            </div>
          </div>

          <div className="form-element">
            <button type="submit" onClick={handleSignIn}>
              {loading ? "loading..." : "Sign in"}
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
