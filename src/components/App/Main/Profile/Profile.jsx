import React from "react";
import SideBar from "./Sidebar/Sidebar";
import { useState } from "react";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleCardClick, name, addItemButton }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          name={name}
          addItemButton={addItemButton}
        />
      </section>
    </div>
  );
}

export default Profile;
