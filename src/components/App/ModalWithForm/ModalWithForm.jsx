import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  setModal,
  children,
  title,
  buttonText,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
  onAddItem,
  isValid,
}) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      activeModal={activeModal}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      <h2 className="modal__name">{title}</h2>
      <form
        className="modal__form"
        name={name}
        id="modal__form"
        noValidate
        onSubmit={onAddItem}
      >
        {children}
        <div>
          <button
            className={
              isValid ? "modal__button" : "modal__button modal__button_disabled"
            }
            type="submit"
            onMouseEnter={onHover}
            onMouseLeave={onHoverEnd}
          >
            {buttonText}
          </button>
          {(name === "login_modal" || name === "register_modal") && (
            <button
              type="button"
              className={
                !isValid
                  ? "modal__switch-login"
                  : "modal__switch-login_disabled"
              }
              onClick={() => {
                onClose();
                if (name === "login_modal") setModal("register_modal");
                else setModal("login_modal");
              }}
              onMouseEnter={onHover}
              onMouseLeave={onHoverEnd}
              disabled={isValid}
            >
              {name === "login_modal" ? "or Sign Up" : "or Log In"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
