import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`footer ${darkTheme ? "dark" : "light"}`}>
      <p>&copy; Piwllo.org 2021 - 2022</p>
    </div>
  );
};

export default Footer;
