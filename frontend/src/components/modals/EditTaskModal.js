import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { firstLetterToUpperCase } from "../../helpers/wordHelpers";
import { editTask } from "../../redux/actions/taskActions";
import Alert from "../Alert";
import Spinner from "../shared/Spinner";
import "./styles/_edit-task-modal.scss";

const EditTaskModal = ({ open, setModalIsOpen, tasks, taskId, pageWindow }) => {
  const taskToEdit = tasks && tasks.find((task) => task._id === taskId);

  const [task, setTask] = useState(taskToEdit.task);
  const [rank, setRank] = useState(taskToEdit.rank);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTask = useSelector((state) => state.updateTask);
  const { loading, updateSuccess, updateTasksError } = updateTask;

  const closeModal = () => setModalIsOpen(false);

  const handleEditTask = (e) => {
    e.preventDefault();
    dispatch(editTask(task, rank, taskId));
    // if (updateSuccess) {
    // navigate("/task-manager", { state: { message: updateMessage } });
    //   return pageWindow.location.reload();
    // }
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <form className="edit-task-form-container">
        <h2 style={{ fontFamily: "cursive" }}>Edit task</h2>

        {updateTasksError && (
          <Alert message={updateTasksError} isError={true} />
        )}
        {updateSuccess && pageWindow("/task-manager")}

        <div className="edit-task-form-element">
          <label>Task:</label>
          <div className="edit-task-form-input">
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
    </Modal>
  );
};

export default EditTaskModal;
