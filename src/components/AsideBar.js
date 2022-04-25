import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { listUserTasks } from "../redux/actions/taskActions";
import { firstLetterOfEachWordToUpperCase } from "../helpers/wordHelpers";
// import { GET_USER_TASKS_RESET } from "../redux/constants/taskConstants";

const AsideBar = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [tasksDuplicate, setTasksDuplicate] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const listTasks = useSelector((state) => state.getUserTasks);
  const { tasks } = listTasks;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (tasks) {
      setTasksDuplicate(tasks);
    }
  }, [tasks, userDetails, navigate]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.length < 1) return;

    dispatch(listUserTasks(keyword.length > 0 && keyword));
    closeAside();
    if (tasksDuplicate && tasksDuplicate.length > 0) {
      navigate(`/task/search/${keyword}`);
      setKeyword("");
    }
  };

  return (
    <aside className={`side-bar ${darkTheme ? "dark" : "light"}`}>
      <h2>Piwllo</h2>
      <ul className="aside-items" id="aside-itms">
        <div className="cancel-aside-icon" onClick={closeAside}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="aside-list-items">
          <li className="welcome-user">
            Welcome:{" "}
            <Link
              to={`/user/${
                userDetails && userDetails._id && userDetails._id
              }/profile`}
            >
              {firstLetterOfEachWordToUpperCase(
                userDetails && userDetails.name
              )}
            </Link>
          </li>

          <div className="section task-priority">
            <li>
              <form className="search-section">
                <input
                  type="search"
                  name="search"
                  placeholder="Search task..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="search-icon"
                  type="submit"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-search"></i>
                </button>
              </form>
            </li>

            <li>
              Task Ranks <i className="fa-solid fa-triangle"></i>
            </li>
            <div className="actions">
              <li>
                <Link to={`/`}>All</Link>{" "}
              </li>
              <li onClick={closeAside}>
                <Link to={"/tasks/important"}>Important</Link>{" "}
              </li>
              <li onClick={closeAside}>
                <Link to={"/tasks/very-important"}>Very important</Link>
              </li>
              <li onClick={closeAside}>
                <Link to={"/tasks/priority"}>Priority</Link>
              </li>
            </div>
          </div>

          {/* <div className="section teams">
            <li>Teams</li>
            <div className="actions">
              <li>
                <Link to={"/teams/create"}>Create team</Link>{" "}
              </li>
              <li>
                <Link to="/teams/user">Your teams</Link>{" "}
              </li>
            </div>
          </div> */}

          {userDetails && userDetails.isAdmin && (
            <div className="section admin">
              <li>Admin</li>
              <div className="actions">
                <li>
                  <Link to={"/reviews"}>Reviews</Link>{" "}
                </li>
                <li>
                  <Link to="/users/list">Manage users</Link>{" "}
                </li>
                <li>
                  <Link to="/tasks-list">Tasks list</Link>{" "}
                </li>
              </div>
            </div>
          )}

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
                .open("https://github.com/doluwamu/piwllo.web.client", "_blank")
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
