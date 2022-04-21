import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import Cookie from "js-cookie";

const ThemeToggleButton = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const handleTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem("darkTheme", !darkTheme);
  };
  return (
    <div
      onClick={handleTheme}
      className={`btn-toggle ${darkTheme ? "dark" : "light"}`}
    >
      <div className="toggle"></div>
    </div>
  );
};

export default ThemeToggleButton;
