import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/actions/userActions";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";

const ProfileViewScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  // const params = useParams();
  // const { userId } = params;
  const navigate = useNavigate();

  const getUserProfile = useSelector((state) => state.getUserProfile);
  const { loading, profileInfo, error } = getUserProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  useEffect(() => {
    if (!userDetails) navigate("/signin");

    dispatch(fetchUserProfile());
  }, [dispatch, userDetails, navigate]);

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

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
          <img
            src={userDetails ? userDetails.image.url : "/images/avatar.jpg"}
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            fontFamily: "cursive",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          Your profile
        </h2>

        {error && <Alert message={error} isError={true} />}

        <div className="profile-info">
          {/* Profile */}
          <div className="user-image">
            <img
              src={profileInfo ? profileInfo.image.url : "/images/avatar.jpg"}
              alt="img"
            />
          </div>

          <div className="user-info">
            <div className="info user-name">
              <h3>Username:</h3>
              <p>{profileInfo && profileInfo.name}</p>
            </div>

            <div className="info user-name">
              <h3>Email:</h3>
              <p>{profileInfo && profileInfo.email}</p>
            </div>

            <div className="btn-edit">
              <Link to={`/user/${userDetails && userDetails._id}/profile/edit`}>
                <button>{loading ? <Spinner /> : "Edit"}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewScreen;
