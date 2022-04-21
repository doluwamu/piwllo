import React, { useContext } from "react";
import AllRoutes from "./AllRoutes";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`canvas ${darkTheme ? "canvas-dark" : "canvas-light"}`}>
      <AllRoutes />
    </div>
  );
};

export default App;
