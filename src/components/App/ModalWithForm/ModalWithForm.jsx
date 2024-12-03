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
        <form className="modal__form" name={name} id="modal__form" noValidate>
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

// Validation - not sure, how to implement the validation here

// function setEventListeners() {
//   // look for the inputs and the submit button inside the form
//   const inputList = getInputList();
//   const submitButton = document.getElementById("add_garment_button");
//   //loop through the inputs to see if all is valid
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", (evt) => {
//       //check input validity
//       checkInputValidity(inputElement);
//       //disable the button if input is not valid
//     });
//   });
// }

// function hasInvalidInput() {
//   return getInputList().some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// hasInvalidInput();
