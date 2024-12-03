import "./ItemModal.css";

function ItemModal({
  activeModal,
  feeling,
  onClose,
  onHover,
  onHoverEnd,
  name,
  card,
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
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__name_image">{card.name}</h2>
          <p className="modal__weather_image">{`Weather: ${feeling}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
