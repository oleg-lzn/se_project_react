import { useEffect } from "react";
import React from "react";
import "./Modal.css";

function Modal({ name, onClose, children, activeModal, onHover, onHoverEnd }) {
  useEffect(() => {
    const handleEscape = (e) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    e.target === e.currentTarget && onClose();
  };

  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal && activeModal === name ? "modal_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      {/* the container for the contents */}
      <div className="modal__container">
        {/* here will be anything you add as `children`*/}
        {children}
        {/* add the close button */}
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        />
      </div>
    </div>
  );
}

export default Modal;
