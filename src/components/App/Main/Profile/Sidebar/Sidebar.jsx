import React from "react";
import avatarTrue from "../../../../../assets/images/avatar_true.svg";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarTrue} alt="Avatar image" />
      <p className="sidebar__name">Oleg Luzenin</p>
    </div>
  );
}

export default SideBar;
