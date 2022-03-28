import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import FormValidationErrors from "../errors/FormValidationErrors";
import validator from "validator";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);

  const { darkTheme } = useContext(ThemeContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, success, error, userDetails } = userLogin;

  const location = useLocation();
  const { message } = location.state || "";

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) return <Navigate to="/task-manager" />;
  }, [userDetails]);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailRequiredError(true);

      if (emailValidationError) {
        setEmailValidationError(false);
      }
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailValidationError(true);

      if (emailRequiredError) setEmailRequiredError(false);
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailValidationError(true);
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

        <h2>Sign in</h2>

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
              <FormValidationErrors
                error={emailRequiredError}
                message={"This field is required"}
              />
              <FormValidationErrors
                error={emailValidationError}
                message={"Please enter a valid email"}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (password && passwordRequiredError) {
                    setPasswordRequiredError(false);
                  }
                }}
              />
              <FormValidationErrors
                error={passwordRequiredError}
                message={"This field is required"}
              />
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
