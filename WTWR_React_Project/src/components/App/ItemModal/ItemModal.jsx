import "./ItemModal.css";

function ItemModal({ activeModal }) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          //   onClick={onClose}
          //   onMouseEnter={onHover}
          //   onMouseLeave={onHoverEnd}
        ></button>
        <img
          className="modal__image"
          //   src={props.item.link}
          //   alt={props.item.name}
        />
        <h2 className="modal__name">name</h2>
        <p className="modal__weather">Weather: Hot</p>
      </div>
    </div>
  );
}

export default ItemModal;
