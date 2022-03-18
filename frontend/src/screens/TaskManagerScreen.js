import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";

const TaskManagerScreen = () => {
  const [task, setTask] = useState('');

  const { darkTheme } = useContext(ThemeContext);

  const handleAddTask = (e) => {
    e.preventDefault();
  };

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

        <h1>Tasks</h1>

        <div className="task-actions-section">
          <div className="add-task">
            <input
              type="text"
              name="task"
              placeholder="Enter a task"
              className="add-task-input"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <select className="priority-select">
              <option value="">--Priority level--</option>
              <option value="important">Important</option>
              <option value="very important">Very important</option>
              <option value="priority">Priority</option>
            </select>
            <button className="btn-add" type="submit" onClick={handleAddTask}>
              Add task
            </button>
          </div>

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
                  <td className="priority">Priority</td>
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
                  <td className="priority">Priority</td>
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

export default TaskManagerScreen;
