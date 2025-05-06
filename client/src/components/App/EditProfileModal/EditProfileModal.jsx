import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { useContext } from "react";

function EditProfileModal({
  buttonText,
  title,
  onAddItem,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  const { resetForm, values, isValid, errors, handleChange } =
    useFormAndValidation();

  const { currentUser } = useContext(CurrentUserContext);

  //   useEffect(() => {
  //     if (activeModal)
  //       resetForm(
  //         {
  //           name_input: "",
  //           url_input: "",
  //           radio_input: "",
  //         },
  //       );
  //   }, [activeModal, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (onAddItem) {
      onAddItem(values);
    }
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
            value={currentUser.name}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.name}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="avatar" className="modal__lable">
          Avatar
          <input
            name="avatar"
            className={`modal__input ${
              errors.url ? "modal__input_type_error" : ""
            }`}
            type="url"
            placeholder="Image URL"
            required
            id="avatar"
            value={currentUser.avatar}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.avatar}</span>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
