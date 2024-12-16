import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import "./ItemModal.css";

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
    <div
      className={`modal modal_type_picture ${
        activeModal && activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container_image">
        <button
          type="button"
          className="modal__close_image"
          onClick={onClose}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__text-container">
            <h2 className="modal__name_image">{card.name}</h2>
            <p className="modal__weather_image">{`Weather: ${card.weather}`}</p>
          </div>
          <button
            className="modal__delete-button"
            type="button"
            onClick={() => openConfirmationModal(card, "confirmation_modal")}
          >
            {" "}
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
