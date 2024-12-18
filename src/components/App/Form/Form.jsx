import React from "react";

function Form({ onAddItem, name, onHover, onHoverEnd, buttonText, children }) {
  return (
    <form
      className="modal__form"
      name={name}
      id="modal__form"
      noValidate
      onSubmit={onAddItem}
    >
      {children}
      <button
        className="modal__button"
        type="submit"
        id="add_garment_button"
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
