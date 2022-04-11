import React, { useState } from "react";
import {useDispatch}  from 'react-redux'
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./styles/_review-success-modal.scss";
import {ADD_REVIEW_RESET} from '../../redux/constants/reviewConstants'

const ReviewSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch()

  const closeModal = () => {
    setIsOpen(false)
    dispatch({ type: ADD_REVIEW_RESET })
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <div className="review-modal-content">
        <p>
          <b>Review submitted successfully :)</b>
        </p>
        <p>Thank you for your feedback</p>

        <button type="button" onClick={() => setIsOpen(false)}>
          Okay
        </button>
      </div>
    </Modal>
  );
};

export default ReviewSuccessModal;
