import React, { createContext, useState } from "react";
// import jsCookies from "js-cookie";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("darkTheme"))
  );

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
