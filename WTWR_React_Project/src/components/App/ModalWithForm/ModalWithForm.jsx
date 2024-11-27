import { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, title, buttonText, name, onClose, state }) {
  // if state - then mount it open && depending on the state

  return (
    <>
      {state && (
        <div className={`modal modal_type_${name}`} id="add_clothes_id">
          <div className="modal__container">
            <h2 className="modal__name">{title}</h2>
            <button
              type="button"
              className="modal__close"
              onClick={onClose}
            ></button>
            <form className="modal__form" name={name}>
              {children}
              <button
                className="modal__button modal__button_disabled"
                type="submit"
                id="add_garment_button"
                disabled
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWithForm;
