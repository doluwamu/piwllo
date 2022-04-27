import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AsideBar from "../components/AsideBar";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import TasksPaginate from "../components/paginations/TasksPagination";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
import { listTaskByRank, removeTask } from "../redux/actions/taskActions";
import { firstLetterToUpperCase, wordBreak } from "../helpers/wordHelpers";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";
import {
  GET_USER_TASKS_RESET,
  UPDATE_TASK_RESET,
} from "../redux/constants/taskConstants";

const TaskRankingScreen = () => {
  const { darkTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { taskRank } = params || "";
  const { pageNumber } = params || 1;

  const [taskDetailsView, setTaskDetailsView] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getTaskByRank = useSelector((state) => state.getTaskByRank);
  const { loading, tasks, page, pages, getTasksError } = getTaskByRank;

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
    dispatch(listTaskByRank(taskRank, pageNumber));
  }, [
    dispatch,
    taskRank,
    userDetails,
    navigate,
    deleteTaskMessage,
    updateSuccess,
    pageNumber,
  ]);

  const handleDeleteTask = (id) => {
    const confirm = window.confirm("Do you want to delete this task?");
    if (!confirm) return;
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

        <h1>{firstLetterToUpperCase(`${taskRank} tasks`)}</h1>

        {getTasksError && <Alert message={getTasksError} isError={true} />}
        {deleteTaskError && <Alert message={deleteTaskError} isError={true} />}

        <div className="task-actions-section">
          <div className="show-tasks-section">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th className="priority">Rank</th>
                  <th className="btns"></th>
                </tr>
              </thead>
              {tasks &&
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
                                ? `/tasks/${taskRank}/page/${pageNumber}`
                                : `/tasks/${taskRank}`,
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
                  routeUrl={
                    pageNumber && pageNumber > 0
                      ? `/tasks/${taskRank}/page/${pageNumber}`
                      : `/tasks/${taskRank}`
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
          <TasksPaginate page={page} pages={pages} taskRank={taskRank} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default TaskRankingScreen;
