import React from "react";
import { Link } from "react-router-dom";

const BgImage = () => {
  return (
    <div className="bg-image-section">
      <div className="nav-section">
        <h1>Piwllo</h1>
        <ul>
          <div>
            <li>Welcome</li>
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
            <li>
              <Link to={"/signin"}>Sign in</Link>
            </li>
          </div>
        </ul>
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
