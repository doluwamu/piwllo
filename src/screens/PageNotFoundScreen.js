import React, { useContext } from "react";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import {Link} from 'react-router-dom'

const PageNotFoundScreen = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="add-review-section main">
      <div
        className={`review-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <div className="PNF-container">
          <h2 style={{ textAlign: "center", marginTop: "55px" }}>
            Oooops, this page you're looking for does not exist :(
          </h2>

          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundScreen;
