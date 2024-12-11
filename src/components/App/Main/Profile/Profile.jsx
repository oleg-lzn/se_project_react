import React from "react";
import SideBar from "./Sidebar/Sidebar";

function Profile() {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection>
        <p className="text_clothes">something in the clothes section</p>
      </ClothesSection>
    </div>
  );
}

export default Profile;
