import React from "react";
import SideBar from "./Sidebar/Sidebar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  name,
  addItemButton,
  clothingItems,
  activeModal,
  setModal,
  setIsLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          activeModal={activeModal}
          setModal={setModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          name={name}
          addItemButton={addItemButton}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
