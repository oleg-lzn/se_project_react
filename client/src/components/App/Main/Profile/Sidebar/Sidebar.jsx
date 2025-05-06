import React from "react";
import "./Sidebar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import { removeToken } from "../../../../../utils/token";
import { useNavigate } from "react-router-dom";

function SideBar({ setModal, setIsLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  console.log({ currentUser });

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
    console.log("User logged out");
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="Avatar image"
      />
      <div className="sidebar__text-data">
        <p className="sidebar__name">{currentUser.name}</p>
        <button
          className="sidebar__change-data"
          type="button"
          onClick={() => setModal("edit-profile_modal")}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__log-out"
          type="button"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
