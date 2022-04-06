import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { firstLetterToUpperCase } from "../helpers/wordHelpers";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { fetchTaskById } from "../redux/actions/taskActions";
import Alert from "../components/Alert";
import Spinner from "../components/shared/Spinner";

const EditTaskScreen = () => {
  const [task, setTask] = useState("");
  const [rank, setRank] = useState("");

  const { darkTheme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const params = useParams();
  const { taskId } = params;
  const navigate = useNavigate();

  //   const updateTask = useSelector((state) => state.updateTask);
  //   const { loading, updateSuccess, updateTasksError } = updateTask;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  const getTaskById = useSelector((state) => state.getTaskById);
  const { loading, task: taskById, getTasksByIdError } = getTaskById;

  console.log(task);

  //   const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (!userDetails) navigate("/signin");

    if (!taskById || taskById._id !== taskId) {
      dispatch(fetchTaskById(taskId));
    } else {
      setTask(taskById.task);
      setRank(taskById.rank);
    }
  }, [dispatch, userDetails, navigate, taskId, taskById]);

  const handleEditTask = (e) => {
    e.preventDefault();
    //     dispatch(editTask(task, rank, taskId));
    //     // if (updateSuccess) {
    //     // navigate("/task-manager", { state: { message: updateMessage } });
    //     //   return pageWindow.location.reload();
    //     // }
  };

  return (
    <>
      <div className="back-btn-container">
        <Link to="/task-manager" className="back-btn">
          Go back
        </Link>
      </div>

      <form
        className={`edit-task-form-container ${darkTheme ? "dark" : "light"}`}
      >
        <h2 style={{ fontFamily: "cursive" }}>Edit task</h2>

        {getTasksByIdError && (
          <Alert message={getTasksByIdError} isError={true} />
        )}

        <div className="edit-task-form-element">
          <label>Task:</label>
          <div className="edit-task-form-component">
            <input
              type="text"
              name="task"
              placeholder="Write here"
              value={firstLetterToUpperCase(task)}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
        </div>

        <div className="edit-task-form-element">
          <label>Rank:</label>
          <div className="edit-task-form-component">
            <select
              className="rank-select"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            >
              <option value="">--Priority level--</option>
              <option value={"important"}>Important</option>
              <option value={"very-important"}>Very-important</option>
              <option value={"priority"}>Priority</option>
            </select>
          </div>
        </div>

        <div className="edit-task-form-element">
          <button
            type="submit"
            className="edit-task-button"
            onClick={handleEditTask}
          >
            {loading ? (
              <Spinner width="25px" height="25px" marginLeft="45%" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      <br />
    </>
  );
};

export default EditTaskScreen;
