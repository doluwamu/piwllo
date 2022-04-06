import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./styles/_edit-task-modal.scss";

const EditTaskModal = ({ open, setModalIsOpen }) => {
  const [task, setTask] = useState("");
  const [rank, setRank] = useState("");

  const closeModal = () => setModalIsOpen(false);

  const handleEditTask = (e) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <form className="edit-task-form-container">
        <h2>Edit task</h2>

        <div className="edit-task-form-element">
          <label>Task:</label>
          <div className="edit-task-form-input">
            <input
              type="text"
              name="task"
              placeholder="Write here"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
        </div>

        <div className="edit-task-form-element">
          <select
            className="rank-select"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          >
            <option value="">--Priority level--</option>
            <option>Important</option>
            <option>Very-important</option>
            <option>Priority</option>
          </select>
        </div>

        <div className="edit-task-form-element">
          <button
            type="submit"
            className="edit-task-button"
            onClick={handleEditTask}
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
