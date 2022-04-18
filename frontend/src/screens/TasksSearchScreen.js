import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import AsideBar from "../components/AsideBar";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import FormValidationErrors from "../errors/FormValidationErrors";
import { firstLetterToUpperCase, wordBreak } from "../helpers/wordHelpers";
import {
  // createTask,
  listUserTasks,
  removeTask,
} from "../redux/actions/taskActions";
import {
  GET_USER_TASKS_RESET,
  UPDATE_TASK_RESET,
} from "../redux/constants/taskConstants";

const TasksSearchScreen = () => {
  const [taskDetailsView, setTaskDetailsView] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { keyword } = params || "";

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const listTasks = useSelector((state) => state.getUserTasks);
  const { loading, tasks, error } = listTasks;

  const addTask = useSelector((state) => state.addTask);
  const { message: addTaskMessage, error: addTaskError } = addTask;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { message: deleteTaskMessage, error: deleteTaskError } = deleteTask;

  const updateTask = useSelector((state) => state.updateTask);
  const { updateSuccess } = updateTask;

  useEffect(() => {
    if (!userDetails) {
      navigate("/signin");
    }
    if (updateSuccess) {
      dispatch({
        type: GET_USER_TASKS_RESET,
      });
      dispatch({
        type: UPDATE_TASK_RESET,
      });
    }
    dispatch(listUserTasks(keyword));
  }, [
    userDetails,
    navigate,
    dispatch,
    addTaskMessage,
    deleteTaskMessage,
    updateSuccess,
    keyword,
  ]);

  const handleDeleteTask = async (id) => {
    dispatch(removeTask(id));
  };

  const openTaskViewModal = (detail) => {
    if (!taskDetailsView) {
      setTaskDetailsView(true);
    }
    setTaskDetails(detail);
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

        <h1>{`Tasks for "${keyword}" found`}</h1>

        <div className="task-actions-section">
          {/* Error on performing actions */}
          {error && <Alert message={error} isError={true} />}
          {addTaskError && <Alert message={addTaskError} isError={true} />}
          {deleteTaskError && (
            <Alert message={deleteTaskError} isError={true} />
          )}

          <div className="show-tasks-section">
            {/* {loading && <p>loading...</p>} */}

            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th className="priority">Rank</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              {tasks &&
                tasks.tasks &&
                tasks.tasks.length > 0 &&
                tasks.tasks.map((t) => (
                  <tbody key={t._id}>
                    <tr>
                      <td onClick={() => openTaskViewModal(t)}>
                        {firstLetterToUpperCase(wordBreak(t.task))}
                      </td>
                      <td
                        className="priority"
                        onClick={() => openTaskViewModal(t)}
                      >
                        {firstLetterToUpperCase(t.rank)}
                      </td>
                      <td>
                        <Link
                          to={`/task/${t._id}/edit`}
                          state={{ routeUrl: "/", task: t }}
                        >
                          <button type="button" className="btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
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
              {taskDetailsView && (
                <ViewTaskDetailsModal
                  taskDetails={taskDetails}
                  setTaskDetailsView={setTaskDetailsView}
                  routeUrl={"/"}
                  deleteTask={handleDeleteTask}
                />
              )}
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
              (!tasks || !tasks.tasks || tasks.tasks.length === 0) && (
                <p style={{ textAlign: "center" }}>No tasks found</p>
              )
            )}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default TasksSearchScreen;
