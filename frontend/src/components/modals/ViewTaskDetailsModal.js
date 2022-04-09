import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./styles/_view-task-detail-modal.scss";
import { firstLetterToUpperCase } from "../../helpers/wordHelpers";
import { Link } from "react-router-dom";
import Moment from "moment";
import { extendMoment } from "moment-range";

const ViewTaskDetailsModal = ({
  taskDetails,
  setTaskDetailsView,
  routeUrl,
  deleteTask,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const moment = extendMoment(Moment);

  const closeModal = () => {
    setIsOpen(false);
    setTaskDetailsView(false);
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <div className="view-task-modal-content">
        <div className="view-task-element">
          <label>
            <b>Task:</b>
          </label>
          <div>{firstLetterToUpperCase(taskDetails.task)}</div>
        </div>

        <div className="view-task-element">
          <label>
            <b>Rank:</b>
          </label>
          <div>{firstLetterToUpperCase(taskDetails.rank)}</div>
        </div>

        <div className="view-task-element">
          <label>
            <b>Created on:</b>
          </label>
          <div>
            {moment(taskDetails.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
          </div>
        </div>

        <div className="view-task-element">
          <label>
            <b>Last updated:</b>
          </label>
          <div>
            {moment(taskDetails.updatedAt).format("dddd, MMMM Do YYYY, h:mm a")}
          </div>
        </div>

        <div className="view-buttons">
          <Link
            to={`/task/${taskDetails._id}/edit`}
            state={{
              routeUrl: routeUrl ? routeUrl : "/",
              task: taskDetails,
            }}
          >
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsOpen(false)}
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="delete-btn"
            onClick={() => deleteTask(taskDetails._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskDetailsModal;
