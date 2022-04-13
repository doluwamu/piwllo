import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { emailVerify } from "../redux/actions/authActions";
import FormValidationErrors from "../errors/FormValidationErrors";
import validator from "validator";
import Spinner from "../components/shared/Spinner";
import { VERIFY_EMAIL_RESET } from "../redux/constants/authConstants";

const VerifyEmailScreen = () => {
  const [email, setEmail] = useState("");

  const [emailRequiredError, setEmailRequiredError] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState(false);

  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyEmail = useSelector((state) => state.verifyEmail);
  const {
    loading: verifyEmailLoading,
    message: verifyEmailMessage,
    error: verifyEmailError,
  } = verifyEmail;

  useEffect(() => {
    if (verifyEmailMessage) {
      dispatch({ type: VERIFY_EMAIL_RESET });
      navigate("/password-reset", { state: { email } });
    }
  }, [verifyEmailMessage, navigate, email]);

  const handleVerifyEmail = (e) => {
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
    dispatch(emailVerify(email));
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

        <h2>Enter email</h2>

        {verifyEmailError && (
          <Alert message={verifyEmailError} isError={true} />
        )}

        <div className="form-elements">
          <div className="form-element">
            <label>Email:</label>
            <div className="input-element">
              <input
                type="email"
                name="email"
                placeholder="Write here"
                autoComplete={"email"}
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
            <button type="submit" onClick={handleVerifyEmail}>
              {verifyEmailLoading ? (
                <Spinner width="20px" height="20px" marginLeft="45%" />
              ) : (
                "Verify email"
              )}
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

export default VerifyEmailScreen;
