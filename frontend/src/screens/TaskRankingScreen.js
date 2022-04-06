import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AsideBar from "../components/AsideBar";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { listTaskByRank, removeTask } from "../redux/actions/taskActions";
import { firstLetterToUpperCase } from "../helpers/wordHelpers";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";

const TaskRankingScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { taskRank } = params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getTaskByRank = useSelector((state) => state.getTaskByRank);
  const { loading, tasks, getTasksError } = getTaskByRank;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { message: deleteTaskMessage, error: deleteTaskError } = deleteTask;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    dispatch(listTaskByRank(taskRank));
  }, [dispatch, taskRank, userDetails, navigate, deleteTaskMessage]);

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
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

        <h1>{firstLetterToUpperCase(`${taskRank} tasks`)}</h1>

        {getTasksError && <Alert message={getTasksError} isError={true} />}
        {deleteTaskError && <Alert message={deleteTaskError} isError={true} />}
        {deleteTaskMessage && <Alert message={deleteTaskMessage} />}

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
              {tasks &&
                tasks.length > 0 &&
                tasks.map((t) => (
                  <tbody key={t._id}>
                    <tr>
                      <td>{firstLetterToUpperCase(t.task)}</td>
                      <td className="priority">
                        {firstLetterToUpperCase(t.rank)}
                      </td>
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
              <Spinner
                width="30px"
                height="30px"
                marginLeft="50%"
                marginTop={"10px"}
                marginBottom={"10px"}
              />
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

export default TaskRankingScreen;