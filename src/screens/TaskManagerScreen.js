import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import AsideBar from "../components/AsideBar";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import TasksPaginate from "../components/paginations/TasksPagination";
import Spinner from "../components/shared/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import FormValidationErrors from "../errors/FormValidationErrors";
import { firstLetterToUpperCase, wordBreak } from "../helpers/wordHelpers";
import {
  createTask,
  listUserTasks,
  removeTask,
} from "../redux/actions/taskActions";
import {
  GET_USER_TASKS_RESET,
  UPDATE_TASK_RESET,
} from "../redux/constants/taskConstants";

const TaskManagerScreen = () => {
  const [task, setTask] = useState("");
  const [rank, setRank] = useState("");

  const [taskRequiredError, setTaskRequiredError] = useState(false);
  const [rankRequiredError, setRankRequiredError] = useState(false);

  const [taskDetailsView, setTaskDetailsView] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { pageNumber } = params || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const listTasks = useSelector((state) => state.getUserTasks);
  const { loading, tasks, page, pages, error } = listTasks;

  const addTask = useSelector((state) => state.addTask);
  const { message: addTaskMessage, error: addTaskError } = addTask;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { message: deleteTaskMessage, error: deleteTaskError } = deleteTask;

  const updateTask = useSelector((state) => state.updateTask);
  const { updateSuccess } = updateTask;

  useEffect(() => {
    if (!userDetails) navigate("/signin");

    if (updateSuccess) {
      dispatch({
        type: GET_USER_TASKS_RESET,
      });
      dispatch({
        type: UPDATE_TASK_RESET,
      });
    }
    dispatch(listUserTasks("", pageNumber));
  }, [
    userDetails,
    navigate,
    dispatch,
    addTaskMessage,
    deleteTaskMessage,
    updateSuccess,
    pageNumber,
  ]);

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

  const handleDeleteTask = async (id) => {
    dispatch(removeTask(id));
  };

  const openTaskViewModal = (detail) => {
    if (!taskDetailsView) {
      setTaskDetailsView(true);
    }
    setTaskDetails(detail);
  };

  const redirectToProfile = () => navigate(`/user/${userDetails._id}/profile`);

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
          <img
            src={userDetails ? userDetails.image.url : "/images/avatar.jpg"}
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h1>Tasks</h1>

        <div className="task-actions-section">
          {/* Error on performing actions */}
          {error && <Alert message={error} isError={true} />}
          {addTaskError && <Alert message={addTaskError} isError={true} />}
          {deleteTaskError && (
            <Alert message={deleteTaskError} isError={true} />
          )}

          <div className={`task-ranks-section ${darkTheme ? "dark" : "light"}`}>
            <Link to={"/tasks/important"} className="important-task rank">
              Important
            </Link>

            <Link
              to={"/tasks/very-important"}
              className="very-important-task rank"
            >
              Very-important
            </Link>

            <Link to={"/tasks/priority"} className="priority-task rank">
              Priority
            </Link>
          </div>

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
                <option value="">--Rank--</option>
                <option>Important</option>
                <option>Very-important</option>
                <option>Priority</option>
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
                  <th className="priority">Rank</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              {tasks &&
                tasks &&
                tasks.length > 0 &&
                tasks.map((t) => (
                  <tbody key={t._id}>
                    <tr>
                      <td onClick={() => openTaskViewModal(t)}>
                        {firstLetterToUpperCase(wordBreak(t.task, 30))}
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
                          state={{
                            routeUrl:
                              pageNumber && pageNumber > 0
                                ? `/page/${pageNumber}`
                                : "/",
                            task: t,
                          }}
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
                  routeUrl={
                    pageNumber && pageNumber > 0 ? `/page/${pageNumber}` : "/"
                  }
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
              (!tasks || !tasks || tasks.length === 0) && (
                <p style={{ textAlign: "center" }}>No tasks found</p>
              )
            )}
          </div>
          <TasksPaginate page={page} pages={pages} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default TaskManagerScreen;
