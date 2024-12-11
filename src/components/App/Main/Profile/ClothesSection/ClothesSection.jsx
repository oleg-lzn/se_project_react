import React from "react";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../../../../utils/items";
import ItemCard from "../../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button-add-item" type="button">
          + Add new
        </button>
      </div>
      <ul className="clothes-section_list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // pass it as prop
              // onImageClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
