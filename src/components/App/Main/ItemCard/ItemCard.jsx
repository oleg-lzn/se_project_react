import "./ItemCard.css";

function ItemCard({ item, onImageClick, name }) {
  const handleCardClick = () => {
    onImageClick(item, name);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name || "Item Image"}
        onError={() => console.error("Error loading the image", item.imageUrl)}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
