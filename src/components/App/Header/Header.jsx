import { useState, useEffect, useContext } from "react";
import imageLogo from "../../../assets/images/Logo.svg";
import avatarTrue from "../../../assets/images/avatar_true.svg";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Header({ city, setModal, onHover, onHoverEnd }) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Loading location...");
  const [isMobileMenuOpened, openMobileMenu] = useState("false");

  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  function toggleMobileMenu() {
    openMobileMenu((prevValue) => !prevValue);
  }

  useEffect(() => {
    const date = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    city ? setCurrentLocation(city) : setCurrentLocation("Loading location...");
  }, [city]);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={imageLogo} alt="App logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {currentLocation}
      </p>
      <div className="desktop-toggle">
        <ToggleSwitch />
      </div>

      {!isLoggedIn && (
        <button
          className="header__button-add-clothes"
          type="button"
          onClick={() => setModal("register_modal")}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
          Sign Up
        </button>
      )}

      {!isLoggedIn && (
        <button
          className="header__button-add-clothes"
          type="button"
          onClick={() => setModal("login_modal")}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
          Log In
        </button>
      )}

      {isLoggedIn && (
        <button
          className="header__button-add-clothes"
          type="button"
          onClick={() => setModal("add-item_modal")}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
          + Add Clothes
        </button>
      )}

      {isLoggedIn && (
        <Link to="/profile" className="header__link">
          <div className="header__user">
            <p className="header__profile-name">{currentUser.name}</p>
            <img
              className="header__avatar"
              src={currentUser.avatar || avatarTrue}
              alt="Avatar image"
            />
          </div>
        </Link>
      )}

      {isMobileMenuOpened && (
        <button
          className="header__hamburger_button"
          type="button"
          onClick={toggleMobileMenu}
        ></button>
      )}
      <div
        className={`header__container_mobile ${
          !isMobileMenuOpened ? "header__container_mobile_opened" : ""
        }`}
      >
        <Link to="/profile" className="header__link">
          <div className="header__user-mobile" onClick={toggleMobileMenu}>
            <p className="header__profile-name">{currentUser.name}</p>
            <img
              className="header__avatar"
              src={currentUser.avatar || avatarTrue}
              alt="Avatar image"
            />
          </div>
        </Link>
        <button
          className="header__button-add-clothes-mobile"
          type="button"
          onClick={() => setModal("add-item_modal")}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
          + Add Clothes
        </button>

        {!isMobileMenuOpened && (
          <div className="mobile-menu">
            <ToggleSwitch />
          </div>
        )}
        <button
          type="button"
          className="header__close_container"
          onClick={toggleMobileMenu}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        ></button>
      </div>
    </header>
  );
}

export default Header;
