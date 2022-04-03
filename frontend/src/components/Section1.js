import React from "react";
// import { Link } from "react-router-dom";

const Section1 = ({ darkTheme }) => {
  return (
    <div
      className={`sections ${darkTheme ? "dark" : "light"}`}
      id="description"
      data-aos="fade-up"
      // data-aos-once={true}
    >
      <div className="sections-container">
        <div className="avatar">
          <img src="/images/avatar.jpg" alt="avatar" />
        </div>

        <div>
          <div className="subject">
            <div>
              <h2>What is Piwllo?</h2>
              <p>
                Piwllo is a very easy to use task manager which helps in
                organizing your daily tasks. Do you have so many tasks and don't
                know how to order them, worry no more because piwllo got you
                covered. Without much ado, let's jump to the{" "}
                <a href={"#why-piwllo"}>
                  <b>why piwllo?</b>
                </a>{" "}
                section
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
