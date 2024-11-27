import { useState, useEffect } from "react";
import image_logo from "../../../assets/images/Logo.svg";
import avatar_true from "../../../assets/images/avatar_true.svg";
import "./Header.css";

function Header(props) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Loading location...");

  useEffect(() => {
    const date = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    props.city
      ? setCurrentLocation(props.city)
      : setCurrentLocation("Loading location...");
  }, [props.city]);

  // мне кажется, я не правильно использую здесь зависимость и  юз эффект. М
  // Можно напрямую в разметку пробрасывать из пропса город, но как сделать заглушку лоадинг тогда?

  return (
    <header className="header">
      <img className="header__logo" src={image_logo} alt="App logo" />
      <p className="header__date-location">
        {currentDate}, {currentLocation}
      </p>
      <button className="header__button-add-clothes" type="button">
        + Add Clothes
      </button>
      <div className="header__user">
        <p className="header__profile-name">Oleg Luzenin</p>
        <img className="header__avatar" src={avatar_true} alt="Avatar image" />
      </div>
    </header>
  );
}

export default Header;

// onclick={handleClick}
