import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as auth from "../../../utils/auth";

function RegisterModal({
  buttonText,
  title,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  const { values, isValid, resetForm, handleChange, errors } =
    useFormAndValidation();

  useEffect(() => {
    if (activeModal)
      resetForm(
        {
          name_input: "",
          url_input: "",
          radio_input: "",
        },
        {
          name_input: "",
          url_input: "",
          radio_input: "",
        },
        false
      );
  }, [activeModal, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <ModalWithForm
      title={title}
      buttonText={buttonText}
      name={name}
      onClose={onClose}
      activeModal={activeModal}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
      onAddItem={handleSubmit}
      isValid={isValid}
    >
      <div className="modal__form-group">
        <label htmlFor="email" className="modal__lable">
          Email* {""}
          <input
            name="email_input"
            className={`modal__input ${
              errors.email_input ? "modal__input_type_error" : ""
            }`}
            type="email"
            placeholder="Email"
            required
            id="email"
            value={values.email_input}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.email_input}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="password" className="modal__lable">
          Password* {""}
          <input
            name="password_input"
            className={`modal__input ${
              errors.password_input ? "modal__input_type_error" : ""
            }`}
            type="password"
            placeholder="Password"
            required
            id="password"
            value={values.password_input}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.password_input}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="name" className="modal__lable">
          Name* {""}
          <input
            name="name_input"
            className={`modal__input ${
              errors.name_input ? "modal__input_type_error" : ""
            }`}
            type="text"
            placeholder="Name"
            required
            id="name"
            value={values.name_input}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.name_input}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="avatarUrl" className="modal__lable">
          Avatar URL* {""}
          <input
            name="url_input"
            className={`modal__input ${
              errors.url_input ? "modal__input_type_error" : ""
            }`}
            type="url"
            placeholder="Avatar URL"
            required
            id="avatarUrl"
            value={values.url_input}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.url_input}</span>
      </div>
      <div className="login__signup">
        <Link to="/signin" className="signup__link">
          or Log In
        </Link>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
