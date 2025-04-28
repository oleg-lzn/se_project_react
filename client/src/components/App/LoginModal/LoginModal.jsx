import * as auth from "../../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function LoginModal({
  buttonText,
  title,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
  handleSignIn,
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
    handleSignIn(values);
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
          Email {""}
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
          Password {""}
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
      <div className="login__signup">
        <Link to="/signup" className="signup__link">
          or Sign Up
        </Link>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
