import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import AsideBar from "../components/AsideBar";

const PageNotFoundAuthScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
  }, [userDetails, navigate]);

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

  return (
    <div className="add-review-section main">
      {/* Aside bar */}
      <AsideBar />

      <div
        className={`review-section general-section ${
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

        <div className="PNF-container">
          <h2 style={{ textAlign: "center", marginTop: "55px" }}>
            Oooops, this page you're looking for does not exist :(
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundAuthScreen;
