import React from "react";
import { Link } from "react-router-dom";

const BgImage = () => {
  const openNav = () => {
    const nav = document.getElementById("nav-items");
    nav.classList.remove("none");
    nav.classList.add("block");
  };

  const closeNav = () => {
    const nav = document.getElementById("nav-items");
    nav.classList.remove("block");
    nav.classList.add("none");
  };

  return (
    <div className="bg-image-section">
      <div className="nav-section">
        <h1>Piwllo</h1>
        <ul id="nav-items">
          <div className="nav-icon times" onClick={closeNav}>
            <i className="fa-solid fa-xmark" onClick={closeNav}></i>
          </div>
          <div className="nav-links">
            <li>Welcome</li>
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
            <li>
              <Link to={"/signin"}>Sign in</Link>
            </li>
            <li
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

        <div className="open-nav-icon" onClick={openNav}>
          {/* <div className="nav-icon hamburger"> */}
          <i className="fa-solid fa-bars" onClick={openNav}></i>
          {/* </div> */}
        </div>
      </div>
      <div className="bg-image-container">
        <div className="bg-item intro">
          <h1>Never miss a task</h1>
          <h3>Piwllo, the task manager you need...</h3>
        </div>
        <div className="bg-item image">
          <img src="/images/piwllo.jpg" alt="piwllo" />
        </div>
      </div>
    </div>
  );
};

export default BgImage;
