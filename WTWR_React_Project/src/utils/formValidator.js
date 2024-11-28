// class FormValidator {
//   constructor(config, form) {
//     this._form = form;
//     this._formSelector = config.formSelector;
//     this._inputSelector = config.inputSelector;
//     this._submitButtonSelector = config.submitButtonSelector;
//     this._inactiveButtonClass = config.inactiveButtonClass;
//     this._inputErrorClass = config.inputErrorClass;
//     this._errorClass = config.errorClass;
//   }

//   // ultimate method for form validation
//   enableValidation() {
//     this._form.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     this._setEventListeners();
//   }

//   _setEventListeners() {
//     // look for the inputs and the submit button inside the form
//     this._inputList = Array.from(
//       this._form.querySelectorAll(this._inputSelector)
//     );
//     this._submitButton = this._form.querySelector(this._submitButtonSelector);
//     //loop through the inputs to see if all is valid
//     this._inputList.forEach((inputElement) => {
//       inputElement.addEventListener("input", (evt) => {
//         //check input validity
//         this._checkInputValidity(inputElement);
//         //disable the button if input is not valid
//         this._toggleButtonState(); // check
//       });
//     });
//   }

//   _showInputError(inputElement, errorMessage) {
//     // check should we pass here config
//     // if input is not valid - we'd like to take the validation message,
//     const errorElement = this._form.querySelector(
//       "#" + `${inputElement.id}-error`
//     );
//     // Add error class to the input and show display error message.
//     inputElement.classList.add(this._inputErrorClass);
//     errorElement.classList.add(this._errorClass);
//     errorElement.textContent = errorMessage;
//   }

//   _hideInputError(inputElement) {
//     const errorElement = this._form.querySelector(
//       "#" + `${inputElement.id}-error`
//     );
//     inputElement.classList.remove(this._inputErrorClass);
//     errorElement.classList.remove(this._errorClass);
//     errorElement.textContent = "";
//     // if all the inputs are correct
//     // reset error messages
//   }

//   _checkInputValidity(inputElement) {
//     //for checking the input validity
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//       this._hideInputError(inputElement);
//     }
//   }

//   // Toggling the button state
//   disableButton() {
//     this._submitButton.classList.add(this._inactiveButtonClass);
//     this._submitButton.disabled = true;
//   }

//   _enableButton() {
//     this._submitButton.classList.remove(this._inactiveButtonClass);
//     this._submitButton.disabled = false;
//   }

//   _hasInvalidInput() {
//     return this._inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   }

//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this.disableButton();
//     } else {
//       this._enableButton();
//     }
//   }

//   resetValidation() {
//     this._inputList.forEach((inputElement) => {
//       this._hideInputError(inputElement);
//       inputElement.value = "";
//     });
//     this.disableButton();
//   }
// }

// export default FormValidator;

// // Universal handler for forms validation
// const formValidators = {};

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((form) => {
//     const validator = new FormValidator(config, form);
//     const formId = form.getAttribute("id");
//     formValidators[formId] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(config);

// // Universal handler for forms validation
// const formValidators = {};

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((form) => {
//     const validator = new FormValidator(config, form);
//     const formId = form.getAttribute("id");
//     formValidators[formId] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(config);
