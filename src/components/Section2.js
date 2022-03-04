import React from "react";

const Section2 = ({ darkTheme }) => {
  return (
    <div className={`sections ${darkTheme ? "dark" : "light"}`}>
      <div className="sections-container">
        <div>
          <div className="subject">
            <div>
              <h2>Why Piwllo?</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore
                ex repellendus maiores illum, provident nesciunt facilis rem qui
                aliquid eligendi perspiciatis excepturi impedit placeat quod ut
                quis labore. Soluta, asperiores.
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
