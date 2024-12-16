import React from "react";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../../../../utils/items";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  name,
  addItemButton,
  clothingItems,
}) {
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
            <ItemCard
              key={item._id}
              item={item}
              onImageClick={() => handleCardClick(item, name)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
