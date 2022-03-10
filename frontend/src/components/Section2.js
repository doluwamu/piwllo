import React from "react";
// import { Link } from "react-router-dom";

const Section2 = ({ darkTheme }) => {
  return (
    <div className={`section2 ${darkTheme ? "dark" : "light"}`} id="why-piwllo">
      <div className="section-container">
        <div>
          <div className="subject">
            <div className="sub-contents">
              <h2>Why Piwllo?</h2>
              <p>
                Just imagine the volume of things you have to remember, those
                tasks that you need to get done and those assignments which you
                have to do per day. It's really easy to forget one thing or the
                other trust me(sighs). But with piwllo, you can add all your
                daily tasks to a task manager which reduces your chances of
                leaving any task unattended to, isn't that great!!!
                <br />
                <br />
                And guess what's even better, you can rank all your tasks in
                order of importance. How cool is that!!!
                <br />
                <br />
                So what are you waiting for, jump to the{" "}
                <a href={"#get-started"}>
                  <b>get started</b>
                </a>{" "}
                section and start enjoying the benefits of piwllo with me.
              </p>
            </div>
          </div>
        </div>

        <div className="avatar">
          <img src="/images/avatar.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Section2;
