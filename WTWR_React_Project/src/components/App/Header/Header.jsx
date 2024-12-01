import { useState, useEffect } from "react";
import image_logo from "../../../assets/images/Logo.svg";
import avatar_true from "../../../assets/images/avatar_true.svg";
import "./Header.css";

function Header({ city, openModalButton, onHover, onHoverEnd }) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Loading location...");
  const [isMobileMenuOpened, openModalMenu] = useState("false");

  function toggleMobileMenu() {
    openModalMenu((prevValue) => {
      !prevValue;
    });
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
      <img className="header__logo" src={image_logo} alt="App logo" />
      <p className="header__date-location">
        {currentDate}, {currentLocation}
      </p>

      <button
        className="header__button-add-clothes"
        type="button"
        onClick={openModalButton}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
      >
        + Add Clothes
      </button>
      <div className="header__user">
        <p className="header__profile-name">Oleg Luzenin</p>
        <img className="header__avatar" src={avatar_true} alt="Avatar image" />
      </div>
      <button className="header__hamburger_button" type="button"></button>
      {/* {isMobileMenuOpened && ( */}
      <div className="header__container_mobile header__container_mobile_opened">
        <button
          type="button"
          className="modal__close_image"
          // onClick={onClose}
          // onMouseEnter={onHover}
          // onMouseLeave={onHoverEnd}
        ></button>
      </div>
      {/* )} */}
    </header>
  );
}

export default Header;
