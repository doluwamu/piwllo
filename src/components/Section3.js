import React from "react";
import { Link } from "react-router-dom";

const Section3 = ({ darkTheme }) => {
  return (
    <div
      className={`sections ${darkTheme ? "dark" : "light"}`}
      id="get-started"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="sections-container">
        <div className="avatar">
          <img src="/images/avatar.jpg" alt="avatar" />
        </div>

        <div>
          <div className="subject">
            <div>
              <h2>Get started</h2>
              <p>
                It's very easy to get started with piwllo. Just{" "}
                <Link to={"/signup"}>
                  <b>sign up</b>
                </Link>{" "}
                for a free account or{" "}
                <Link to={"/signin"}>
                  <b>sign in</b>
                </Link>{" "}
                if you already have an account and there you go. You can start
                enjoying the benefits of piwllo.
                <br />
                <br />
                So what are you waiting for, let's get start. Hurray!!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
