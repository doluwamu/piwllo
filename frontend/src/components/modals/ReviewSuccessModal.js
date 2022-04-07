import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./styles/_review-success-modal.scss";

const ReviewSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <div className="review-modal-content">
        <p>
          <b>Review submitted successfully :)</b>
        </p>
        <p>Thank you for the message</p>

        <button type="button" onClick={() => setIsOpen(false)}>
          Okay
        </button>
      </div>
    </Modal>
  );
};

export default ReviewSuccessModal;
