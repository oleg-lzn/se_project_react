import React from "react";
import avatarTrue from "../../../../../assets/images/avatar_true.svg";

function SideBar() {
  return (
    <div className="sideBar">
      <div className="header__user">
        <p className="header__profile-name">Oleg Luzenin</p>
        <img className="header__avatar" src={avatarTrue} alt="Avatar image" />
      </div>
    </div>
  );
}

export default SideBar;
