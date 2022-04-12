import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "../redux/actions/userActions";
// import Alert from "../components/Alert";
// import Spinner from "../components/shared/Spinner";

const UsersListScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  //   const dispatch = useDispatch();
  // const params = useParams();
  // const { userId } = params;
  //   const navigate = useNavigate();

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
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <div className="users-list-section">Users list</div>
      </div>
    </div>
  );
};

export default UsersListScreen;
