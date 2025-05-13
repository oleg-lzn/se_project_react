import "./ItemCard.css";
import like_button from "../../../../assets/images/like_button.svg";
import like_button_active from "../../../../assets/images/like_button_active.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

function ItemCard({ item, onImageClick, name, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    const { _id } = item;
    onCardLike({ _id, isLiked });
  };

  const handleCardClick = () => {
    onImageClick(item, name);
  };

  return (
    <li className="card">
      <div className="card__head">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <img
            src={!isLiked ? like_button : like_button_active}
            alt="like button"
            className="card__like-button"
            onClick={handleLike}
          />
        )}
      </div>
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
