import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  handleCardClick,
  name,
  addItemButton,
  clothingItems,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__button-add-item"
          type="button"
          onClick={() => addItemButton("add-item_modal")}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section_list">
        {clothingItems.map((item) => {
          return (
            item.owner === currentUser._id && (
              <ItemCard
                key={item._id}
                item={item}
                onImageClick={() => handleCardClick(item, name)}
              />
            )
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
