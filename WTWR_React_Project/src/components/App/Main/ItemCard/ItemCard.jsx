import "./ItemCard.css";

function ItemCard(props) {
  return (
    <div className="card">
      <h2 className="card__name">{props.item.name}</h2>
      <img
        className="card__image"
        src={props.item.link}
        alt={props.item.name}
      />
    </div>
  );
}

export default ItemCard;
