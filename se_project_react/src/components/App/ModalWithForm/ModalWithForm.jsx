import "./ModalWithForm.css";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

function ModalWithForm({
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
      <Form
        onAddItem={onAddItem}
        name={name}
        onHover={onHover}
        onHoverEnd={onHoverEnd}
        buttonText={buttonText}
        children={children}
        isValid={isValid}
      />
    </Modal>
  );
}

export default ModalWithForm;
