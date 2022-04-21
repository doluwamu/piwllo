import React, { useContext } from "react";
import "./_spinner.scss";
import { ThemeContext } from "../../context/ThemeContext";

const Spinner = ({
  width = "20px",
  height = "20px",
  marginLeft = "18%",
  marginTop,
  marginBottom,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`sk-chase ${darkTheme ? "dark" : "light"}`}
      style={{ width, height, marginLeft, marginTop, marginBottom }}
    >
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );
};

export default Spinner;
