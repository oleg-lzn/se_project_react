import "./ItemCard.css";

function ItemCard(props) {
  return (
    <li className="card">
      <h2 className="card__name">{props.item.name}</h2>
      <img
        className="card__image"
        src={props.item.link}
        alt={props.item.name}
        // onclick= {handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
