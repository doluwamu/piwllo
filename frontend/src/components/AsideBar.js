import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

const AsideBar = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const openAside = () => {
    const aside = document.getElementById("aside-itms");
    aside.classList.remove("close");
    aside.classList.add("open");
  };

  const closeAside = () => {
    const aside = document.getElementById("aside-itms");
    aside.classList.remove("open");
    aside.classList.add("close");
  };

  const handleSignout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <aside className={`side-bar ${darkTheme ? "dark" : "light"}`}>
      <h2>Piwllo</h2>
      <ul className="aside-items" id="aside-itms">
        <div className="cancel-aside-icon" onClick={closeAside}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="aside-list-items">
          <div className="section task-priority">
            <li>
              Task Ranks <i className="fa-solid fa-triangle"></i>
            </li>
            <div className="actions">
              <li>
                <Link to={"/"}>All</Link>{" "}
              </li>
              <li>
                <Link to={"/tasks/important"}>Important</Link>{" "}
              </li>
              <li>
                <Link to={"/tasks/very-important"}>Very important</Link>
              </li>
              <li>
                <Link to={"/tasks/priority"}>Priority</Link>
              </li>
            </div>
          </div>

          <div className="section teams">
            <li>Teams</li>
            <div className="actions">
              <li>
                <Link to={"/teams/create"}>Create team</Link>{" "}
              </li>
              <li>
                <Link to="/teams/user">Your teams</Link>{" "}
              </li>
            </div>
          </div>

          <div className="section user">
            <li>User</li>
            <div className="actions">
              <li>
                <Link to={`/user/${userDetails && userDetails._id}/profile`}>
                  Your profile
                </Link>{" "}
              </li>
              {/* <li>
                <Link
                  to={`/user/${userDetails && userDetails._id}/profile/edit`}
                >
                  Edit profile
                </Link>{" "}
              </li> */}
            </div>
          </div>

          <li className="reviews">
            <Link to="/review" style={{ fontWeight: "lighter" }}>
              Review
            </Link>
          </li>

          <li
            className="signout"
            style={{ cursor: "pointer", fontWeight: "lighter" }}
            onClick={handleSignout}
          >
            Sign out
          </li>

          <li
            className="github"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window
                .open("https://github.com/doluwamu/piwllo.web", "_blank")
                .focus()
            }
          >
            <i className="fa-brands fa-github"></i>
          </li>
        </div>
      </ul>

      <div className="aside-icon" onClick={openAside}>
        <i className="fa-solid fa-bars"></i>
      </div>
    </aside>
  );
};

export default AsideBar;
