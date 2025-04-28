import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
  card,
  onDelete,
}) {
  return (
    <div
      className={`modal modal_type_confirmation  ${
        activeModal && activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div className="modal__confirmation-container">
        <button
          type="button"
          className="modal__close modal__close-confirmation"
          onClick={onClose}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        ></button>
        <h2 className="modal__confirmation_text">
          {" "}
          Are you sure you want to delete this item?
          <br></br> This action is irreversible.
        </h2>
        <button
          className="modal__confirm-button"
          type="submit"
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
          onClick={() => {
            onDelete(card);
          }}
        >
          {" "}
          Yes, delete item
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
          onClick={onClose}
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
