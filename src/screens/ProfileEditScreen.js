import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import AsideBar from "../components/AsideBar";
import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import {
  editUserProfile,
  fetchUserProfile,
} from "../redux/actions/userActions";
import FormValidationErrors from "../errors/FormValidationErrors";
import validator from "validator";
import { UPDATE_USER_PROFILE_RESET } from "../redux/constants/userConstants";

const ProfileEditScreen = () => {
  const params = useParams();
  const { userId } = params;

  const location = useLocation();
  const { image } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Email validation error state
  const [emailValidationError, setEmailValidationError] = useState(false);

  const getUserProfile = useSelector((state) => state.getUserProfile);
  const { loading, profileInfo, error } = getUserProfile;

  const updateUserProfile = useSelector((state) => state.updateUserProfile);
  const {
    loading: updateLoading,
    success: successUpdate,
    error: updateError,
  } = updateUserProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) navigate("/signin");

    if (successUpdate) {
      dispatch({ type: UPDATE_USER_PROFILE_RESET });
      navigate(`/user/${userId}/profile`);
      window.location.reload();
    }
    if (!profileInfo || profileInfo._id !== userId) {
      dispatch(fetchUserProfile());
    } else {
      setName(profileInfo.name);
      setEmail(profileInfo.email);
    }
  }, [userDetails, dispatch, profileInfo, userId, successUpdate, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Form submission validation starts
    if (email && !validator.isEmail(email)) {
      return setEmailValidationError(true);
    }
    // Form submission validation ends

    dispatch(
      editUserProfile(
        name,
        email,
        image && image._id,
        password,
        confirmPassword
      )
    );
  };

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

  return (
    <div className="profile-edit-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`edit-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <img
            src={
              userDetails && userDetails.image
                ? userDetails.image.url
                : "/images/avatar.jpg"
            }
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <form className={`form-container ${darkTheme ? "dark" : "light"}`}>
          <h2>Edit profile</h2>

          {/* Error messages */}
          {error && <Alert message={error} isError={true} />}
          {updateError && <Alert message={updateError} isError={true} />}

          <div className="avatar">
            <label>
              <img
                title={"Profile Image"}
                src={
                  image
                    ? image.url
                    : profileInfo && profileInfo.image
                    ? profileInfo.image.url
                    : "/images/avatar.jpg"
                }
                alt={"avatar"}
                onClick={() =>
                  navigate("/profile/edit/image/upload", {
                    state: { routeUrl: `/user/${userId}/profile/edit` },
                  })
                }
              />
              {/* onClick={(e) => setImageBase64(e.ta)} */}
            </label>
          </div>

          <div className="form-elements">
            <div className="form-element">
              <label>Username:</label>
              <div className="input-element">
                <input
                  type="text"
                  name="name"
                  placeholder="Write here"
                  autoComplete={"name"}
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
                  autoComplete={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {loading || updateLoading ? (
                  <Spinner width="20px" height="20px" marginLeft="45%" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditScreen;
