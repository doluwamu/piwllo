import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const AsideBar = () => {
  const { darkTheme } = useContext(ThemeContext);

  const openAside = () => {
    const aside = document.getElementById("aside-itms");
    aside.classList.remove("none");
    aside.classList.add("block");
  };

  const closeAside = () => {
    const aside = document.getElementById("aside-itms");
    aside.classList.remove("block");
    aside.classList.add("none");
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
              Task Priories <i className="fa-solid fa-triangle"></i>
            </li>
            <div className="actions">
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
                <Link to={"/team-create"}>Create team</Link>{" "}
              </li>
              <li>
                <Link to="/your-teams">Your teams</Link>{" "}
              </li>
            </div>
          </div>

          <li className="reviews">
            <Link to="/review">Review</Link>
          </li>

          <li className="signout" style={{ cursor: "pointer" }}>
            Sign out
          </li>

          <li className="github">
            <a href="https://github.com/doluwamu/piwllo.web">
              <i className="fa-brands fa-github"></i>
            </a>
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
