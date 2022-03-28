import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import { USER_REGISTERATION_RESET } from "../redux/constants/authConstants";
import Alert from "../components/Alert";
import validator from "validator";
import FormValidationErrors from "../errors/FormValidationErrors";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form validation error states
  const [usernameRequiredError, setUsernameRequiredError] = useState(false);
  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);
  const [passwordMinLengthError, setPasswordMinLengthError] = useState(false);
  const [confirmPasswordRequiredError, setConfirmPasswordRequiredError] =
    useState(false);
  const [confirmPasswordMinLengthError, setConfirmPasswordMinLengthError] =
    useState(false);
  const [passwordsMismatchError, setPasswordsMismatchError] = useState(false);

  const dispatch = useDispatch();

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, success, error } = userRegistration;

  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch({
      type: USER_REGISTERATION_RESET,
    });
  }, [dispatch]);

  const handleSignUp = (e) => {
    e.preventDefault();

    // Form submission validation starts
    if (!name) {
      setUsernameRequiredError(true);
      return;
    }

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

    if (!password) {
      setPasswordRequiredError(true);
      return;
    }

    if (password.length < 8) {
      setPasswordMinLengthError(true);

      if (passwordRequiredError) setPasswordRequiredError(false);
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordRequiredError(true);
      return;
    }

    if (confirmPassword.length < 8) {
      setConfirmPasswordMinLengthError(true);
      if (confirmPasswordRequiredError) setConfirmPasswordRequiredError(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMismatchError(true);

      if (passwordRequiredError) setPasswordRequiredError(false);
      if (passwordMinLengthError) setPasswordMinLengthError(false);
      return;
    }
    // Form submission validation ends

    dispatch(registerUser(name, email, password, confirmPassword));
  };

  const requiredMsg = "This field is required";

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

        {error && (
          <Alert
            bgColor={"red"}
            color={"red"}
            iconName={"fa-solid fa-xmark"}
            message={error}
          />
        )}

        {success && (
          <Navigate
            to="/signin"
            state={{
              message: "Your registration was successful. You can login",
            }}
          />
        )}

        <div className="form-elements">
          <div className="form-element">
            <label>Username:</label>
            <div className="input-element">
              <input
                type="text"
                name="name"
                placeholder="Write here"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (name && usernameRequiredError) {
                    setUsernameRequiredError(false);
                  }
                }}
              />
              <FormValidationErrors
                error={usernameRequiredError}
                message={requiredMsg}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (email && emailRequiredError) {
                    setEmailRequiredError(false);
                  }
                }}
              />
              <FormValidationErrors
                error={emailRequiredError}
                message={requiredMsg}
              />
              <FormValidationErrors
                error={emailValidationError}
                message={"Please enter a valid email!"}
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
                message={requiredMsg}
              />
              <FormValidationErrors
                error={passwordMinLengthError}
                message={"Password must be at least 8 characters long"}
              />
              <FormValidationErrors
                error={passwordsMismatchError}
                message={"Passwords do not match"}
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPassword && confirmPasswordRequiredError) {
                    setConfirmPasswordRequiredError(false);
                  }
                  if (
                    confirmPassword.length >= 8 &&
                    confirmPasswordMinLengthError
                  )
                    setConfirmPasswordMinLengthError(false);
                }}
              />
              <FormValidationErrors
                error={confirmPasswordRequiredError}
                message={requiredMsg}
              />
              <FormValidationErrors
                error={confirmPasswordMinLengthError}
                message={
                  "Confirmation password must be at least 8 characters long"
                }
              />
            </div>
          </div>

          <div className="form-element">
            <button type="submit" onClick={handleSignUp}>
              {loading ? "loading..." : "Sign up"}
            </button>
          </div>
        </div>

        <div className="form-links">
          <p>
            or <Link to={"/signin"}>sign in</Link>?
          </p>
        </div>
      </form>
      <br />
    </>
  );
};

export default SignupScreen;
