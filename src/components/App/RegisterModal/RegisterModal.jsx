import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { useEffect } from "react";

function RegisterModal({
  buttonText,
  title,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
  handleSignup,
  setModal,
}) {
  const { values, isValid, resetForm, handleChange, errors } =
    useFormAndValidation();

  useEffect(() => {
    if (activeModal)
      resetForm(
        {
          name: "",
          avatar: "",
          radio: "",
          password: "",
        },
        {
          name: "",
          avatar: "",
          radio: "",
          password: "",
        },
        false
      );
  }, [activeModal, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSignup(values);
  }

  return (
    <ModalWithForm
      setModal={setModal}
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
          Password* {""}
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
      <div className="modal__form-group">
        <label htmlFor="name" className="modal__lable">
          Name* {""}
          <input
            name="name"
            className={`modal__input ${
              errors.name ? "modal__input_type_error" : ""
            }`}
            type="text"
            placeholder="Name"
            required
            id="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.name}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="avatarUrl" className="modal__lable">
          Avatar URL* {""}
          <input
            name="avatar"
            className={`modal__input ${
              errors.avatar ? "modal__input_type_error" : ""
            }`}
            type="url"
            placeholder="Avatar URL"
            required
            id="avatarUrl"
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.imageUrl}</span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
