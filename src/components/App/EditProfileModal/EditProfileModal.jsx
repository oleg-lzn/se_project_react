import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import * as auth from "../../../utils/auth";
import { getToken } from "../../../utils/token";

function EditProfileModal({
  setModal,
  buttonText,
  title,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  const { resetForm, values, isValid, errors, handleChange } =
    useFormAndValidation();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (activeModal && currentUser) {
      resetForm({
        name: currentUser.name || "",
        imageUrl: currentUser.avatar || "",
      });
    }
  }, [activeModal, currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();
    const { name, imageUrl } = values;
    auth
      .editUser(token, { name, avatar: imageUrl })
      .then((userData) => {
        setCurrentUser(userData);
        resetForm({
          name: userData.name,
          imageUrl: userData.avatar,
        });
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
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
        <label htmlFor="avatar" className="modal__lable">
          Avatar
          <input
            name="imageUrl"
            className={`modal__input ${
              errors.url ? "modal__input_type_error" : ""
            }`}
            type="url"
            placeholder="Image URL"
            required
            id="avatar"
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.imageUrl}</span>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
