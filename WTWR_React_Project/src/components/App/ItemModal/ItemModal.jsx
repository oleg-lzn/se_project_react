import { useState, useEffect } from "react";
import "./ItemModal.css";

function ItemModal(props) {
  const [open, openModal] = useState("close");

  useEffect(() => {});

  return (
    <div className="modal">
      <img
        className="modal__image"
        src={props.item.link}
        alt={props.item.name}
      />
      <h2 className="modal__name">{props.item.name}</h2>
      <p className="modal__weather">{props.item.name}</p>
    </div>
  );
}

export default ItemModal;
