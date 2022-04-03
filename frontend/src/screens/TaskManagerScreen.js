import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import FormValidationErrors from "../errors/FormValidationErrors";
import {
  createTask,
  listUserTasks,
  removeTask,
} from "../redux/actions/taskActions";

const TaskManagerScreen = () => {
  const [task, setTask] = useState("");
  const [rank, setRank] = useState("");

  const [taskRequiredError, setTaskRequiredError] = useState(false);
  const [rankRequiredError, setRankRequiredError] = useState(false);

  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const listTasks = useSelector((state) => state.getUserTasks);
  const { loading, tasks, error } = listTasks;

  const addTask = useSelector((state) => state.addTask);
  const { message: addTaskMessage, error: addTaskError } = addTask;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { message: deleteTaskMessage, error: deleteTaskError } = deleteTask;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetails) {
      navigate("/signin");
    }
    dispatch(listUserTasks());
  }, [userDetails, navigate, dispatch, addTaskMessage, deleteTaskMessage]);

  const handleAddTask = (e) => {
    if (!task) {
      return setTaskRequiredError(true);
    }

    if (!rank) {
      return setRankRequiredError(true);
    }

    e.preventDefault();

    dispatch(createTask(task, rank));
    setTask("");
    setRank("");
    setTaskRequiredError(false);
    setRankRequiredError(false);
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
    if (tasks && tasks.length > 0) {
      tasks.filter((task) => task._id === id);
      // console.log([...tasks]);
    }
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
          {error && (
            <Alert
              bgColor={"red"}
              color={"red"}
              iconName={"fa-solid fa-xmark"}
              message={error}
            />
          )}
          {addTaskError && (
            <Alert
              bgColor={"red"}
              color={"red"}
              iconName={"fa-solid fa-xmark"}
              message={addTaskError}
            />
          )}
          {deleteTaskError && (
            <Alert
              bgColor={"red"}
              color={"red"}
              iconName={"fa-solid fa-xmark"}
              message={deleteTaskError}
            />
          )}
          {addTaskMessage && <Alert message={addTaskMessage} />}
          {deleteTaskMessage && <Alert message={deleteTaskMessage} />}
          <div className="add-task">
            <div className="task-input">
              <input
                type="text"
                name="task"
                // draggable={true}
                placeholder="Enter a task"
                className="add-task-input"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                  if (task && taskRequiredError) setTaskRequiredError(false);
                }}
              />
              <FormValidationErrors error={taskRequiredError} />
            </div>

            <div className="task-rank">
              <select
                className="priority-select"
                value={rank}
                onChange={(e) => {
                  setRank(e.target.value);
                  if (rank && rankRequiredError) setRankRequiredError(false);
                }}
              >
                <option value="">--Priority level--</option>
                <option value="important">Important</option>
                <option value="very important">Very important</option>
                <option value="priority">Priority</option>
              </select>
              <FormValidationErrors error={rankRequiredError} />
            </div>

            <div className="task-btn">
              <button className="btn-add" type="submit" onClick={handleAddTask}>
                Add task
              </button>
            </div>
          </div>

          <div className="show-tasks-section">
            {/* {loading && <p>loading...</p>} */}

            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th className="priority">Priority level</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              {tasks &&
                tasks.length > 0 &&
                tasks.map((t) => (
                  <tbody key={t._id}>
                    <tr>
                      <td>{t.task}</td>
                      <td className="priority">{t.rank}</td>
                      <td>
                        <button type="button" className="btn-edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDeleteTask(t._id)}
                        >
                          <i className="fas fa-trash"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
            {loading ? (
              <p style={{ textAlign: "center" }}>loading...</p>
            ) : (
              (!tasks || tasks.length === 0) && (
                <p style={{ textAlign: "center" }}>No tasks added</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerScreen;
