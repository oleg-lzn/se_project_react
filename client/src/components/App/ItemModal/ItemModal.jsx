import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  activeModal,
  onClose,
  onHover,
  onHoverEnd,
  name,
  card,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

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
        {isOwn && (
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
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
