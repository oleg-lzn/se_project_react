import React from "react";
import avatarTrue from "../../../../../assets/images/avatar_true.svg";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarTrue} alt="Avatar image" />
      <div className="sidebar__text-data">
        <p className="sidebar__name">Oleg Luzenin</p>
        <p className="sidebar__change-data">Change Profile Data</p>
        <p className="sidebar__log-out">Log out</p>
      </div>
    </div>
  );
}

export default SideBar;
