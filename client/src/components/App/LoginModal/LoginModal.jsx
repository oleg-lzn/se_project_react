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
          email: "",
          password: "",
        },
        {
          email: "",
          password: "",
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
            name="email"
            className={`modal__input ${
              errors.email ? "modal__input_type_error" : ""
            }`}
            type="email"
            placeholder="Email"
            required
            id="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.email}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="password" className="modal__lable">
          Password {""}
          <input
            name="password"
            className={`modal__input ${
              errors.password ? "modal__input_type_error" : ""
            }`}
            type="password"
            placeholder="Password"
            required
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.password}</span>
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
