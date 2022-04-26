import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AsideBar from "../components/AsideBar";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import TasksPaginate from "../components/paginations/TasksPagination";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { listAllTasks, removeTask } from "../redux/actions/taskActions";
import { firstLetterToUpperCase, wordBreak } from "../helpers/wordHelpers";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
// import {
//   GET_USER_TASKS_RESET,
//   UPDATE_TASK_RESET,
// } from "../redux/constants/taskConstants";

const TasksListScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { pageNumber } = params || 1;

  const [taskDetailsView, setTaskDetailsView] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getAllTasks = useSelector((state) => state.getAllTasks);
  const { loading, tasks, page, pages, error: getTasksError } = getAllTasks;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { message: deleteTaskMessage, error: deleteTaskError } = deleteTask;

  // const updateTask = useSelector((state) => state.updateTask);
  // const { updateSuccess } = updateTask;

  useEffect(() => {
    if (!userDetails) navigate("/signin");
    if (userDetails && !userDetails.isAdmin) navigate("/");
    dispatch(listAllTasks(pageNumber));
  }, [dispatch, userDetails, navigate, deleteTaskMessage, pageNumber]);

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
    setTaskDetailsView(false);
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
            src={
              userDetails && userDetails.image
                ? userDetails.image.url
                : "/images/avatar.jpg"
            }
            alt="avatar"
            onClick={redirectToProfile}
          />
          <div className="theme-btn-container">
            <ThemeToggleButton />
          </div>
        </div>

        <h1>All tasks</h1>

        {getTasksError && <Alert message={getTasksError} isError={true} />}
        {deleteTaskError && <Alert message={deleteTaskError} isError={true} />}

        <div className="task-actions-section">
          <div className="show-tasks-section">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th className="priority" style={{ width: "130px" }}>
                    Rank
                  </th>
                  <th style={{ width: "230px" }}>Owner</th>
                  <th className="btns" style={{ width: "25px" }}></th>
                </tr>
              </thead>
              {tasks &&
                tasks.length > 0 &&
                tasks.map((t) => (
                  <tbody key={t._id}>
                    <tr>
                      <td onClick={() => openTaskViewModal(t)}>
                        {firstLetterToUpperCase(wordBreak(t.task, 20))}
                      </td>
                      <td
                        className="priority"
                        onClick={() => openTaskViewModal(t)}
                      >
                        {firstLetterToUpperCase(t.rank)}
                      </td>
                      <td onClick={() => openTaskViewModal(t)}>
                        {t.owner && t.owner.email}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-delete"
                          style={{ width: "25px" }}
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
                  routeUrl={
                    pageNumber && pageNumber > 0
                      ? `/tasks-list/page/${pageNumber}`
                      : `/tasks-list`
                  }
                  taskDetails={taskDetails}
                  setTaskDetailsView={setTaskDetailsView}
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
              (!tasks || tasks.length === 0) && (
                <p style={{ textAlign: "center" }}>No tasks found</p>
              )
            )}
          </div>
          <TasksPaginate page={page} pages={pages} isAdmin={true} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default TasksListScreen;
