import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import { USER_REGISTERATION_RESET } from "../redux/constants/authConstants";
import Alert from "../components/Alert";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userRegisteration = useSelector((state) => state.userRegistration);
  const { loading, success, error } = userRegisteration;

  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch({
      type: USER_REGISTERATION_RESET,
    });
  }, [dispatch]);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, confirmPassword));
  };

  // console.log(props);

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
          // <div>
          //   <small>
          // Registration successful, <Link to={"/signin"}>sign in</Link> to
          //     your account
          //   </small>
          // </div>
        )}

        <h2>Sign up</h2>

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
    </>
  );
};

export default SignupScreen;
