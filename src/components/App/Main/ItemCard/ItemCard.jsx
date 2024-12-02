import "./ItemCard.css";

function ItemCard({ item, onImageClick }) {
  const handleCardClick = () => {
    onImageClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.link}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
