import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  // if state - then mount it open && depending on the state

  return (
    <div
      className={`modal ${
        activeModal && activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <h2 className="modal__name">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        ></button>
        <form className="modal__form" name={name}>
          {children}
          <button
            className="modal__button modal__button_disabled"
            type="submit"
            id="add_garment_button"
            disabled
            onMouseEnter={onHover}
            onMouseLeave={onHoverEnd}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
