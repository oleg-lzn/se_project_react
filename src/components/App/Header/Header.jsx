import { useState, useEffect } from "react";
import imageLogo from "../../../assets/images/Logo.svg";
import avatarTrue from "../../../assets/images/avatar_true.svg";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ city, openModalButton, onHover, onHoverEnd }) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Loading location...");
  const [isMobileMenuOpened, openMobileMenu] = useState("false");

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

  // мне кажется, я не правильно использую здесь зависимость и  юз эффект. М
  // Можно напрямую в разметку пробрасывать из пропса город, но как сделать заглушку лоадинг тогда?

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
      <button
        className="header__button-add-clothes"
        type="button"
        onClick={() => openModalButton("add-item_modal")}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
      >
        + Add Clothes
      </button>

      <Link to="/profile/" className="header__link">
        <div className="header__user">
          <p className="header__profile-name">Oleg Luzenin</p>
          <img className="header__avatar" src={avatarTrue} alt="Avatar image" />
        </div>
      </Link>

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
        <Link to="/profile/" className="header__link">
          <div className="header__user-mobile" onClick={toggleMobileMenu}>
            <p className="header__profile-name">Oleg Luzenin</p>
            <img
              className="header__avatar"
              src={avatarTrue}
              alt="Avatar image"
            />
          </div>
        </Link>
        <button
          className="header__button-add-clothes-mobile"
          type="button"
          onClick={() => openModalButton("add-item_modal")}
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
