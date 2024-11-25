import { useState, useEffect } from "react";
import image_logo from "../../../assets/images/Logo.svg";
import avatar_true from "../../../assets/images/avatar_true.svg";
import "./Header.css";
import getCityAndWeather from "../../../utils/weatherAPI";
import { latitude, longitude, APIKey } from "../../../utils/constants";

function Header() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState([
    "Loading location...",
  ]);

  useEffect(() => {
    const date = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => setCurrentLocation(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={image_logo} alt="App logo" />
      <p className="header__date-location">
        {currentDate}, {currentLocation.city}
      </p>
      <button className="header__button-add-clothes">+ Add Clothes</button>
      <div className="header__user">
        <p className="header__profile-name">Oleg Luzenin</p>
        <img className="header__avatar" src={avatar_true} alt="Avatar image" />
      </div>
    </header>
  );
}

export default Header;
