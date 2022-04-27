import React, { useContext } from "react";
import AllRoutes from "./AllRoutes";
import { ThemeContext } from "./context/ThemeContext";
import Meta from "./components/Meta";

const App = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`canvas ${darkTheme ? "canvas-dark" : "canvas-light"}`}>
      <Meta />
      <AllRoutes />
    </div>
  );
};

export default App;
