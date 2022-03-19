import React, {  useContext } from "react";
// import { Link } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const VeryImportantTasksScreen = () => {

  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="task-manager-section main">
      {/* Aside bar */}
      <AsideBar />

      {/* task actions */}
      <div
        className={`task-section general-section ${
          darkTheme ? "dark" : "light"
        }`}
      >
        {/* Theme tuggle button */}
        <div className="theme-btn-section">
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h1>Very Important Tasks</h1>

        <div className="task-actions-section">
          <div className="show-tasks-section">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th className="priority">Priority level</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Buy Suya</td>
                  <td className="priority">Very important</td>
                  <td>
                    <button type="button" className="btn-edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button type="button" className="btn-delete">
                      <i className="fas fa-trash"></i>{" "}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Buy Suya</td>
                  <td className="priority">Very important</td>
                  <td>
                    <button type="button" className="btn-edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button type="button" className="btn-delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeryImportantTasksScreen;
