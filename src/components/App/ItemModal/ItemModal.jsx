import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({
  activeModal,
  onClose,
  onHover,
  onHoverEnd,
  name,
  card,
  openConfirmationModal,
}) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      activeModal={activeModal}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
    >
      <img className="modal__image" src={card.imageUrl} alt={card.name} />
      <div className="modal__footer">
        <div className="modal__text-container">
          <h2 className="modal__name_image">{card.name}</h2>
          <p className="modal__weather_image">{`Weather: ${card.weather}`}</p>
        </div>
        <button
          className="modal__delete-button"
          type="button"
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
          onClick={() => openConfirmationModal(card, "confirmation_modal")}
        >
          {" "}
          Delete item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
