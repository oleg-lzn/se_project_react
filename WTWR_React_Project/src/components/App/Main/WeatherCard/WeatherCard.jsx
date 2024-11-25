import { useState, useEffect } from "react";
import { latitude, longitude, APIKey } from "../../../../utils/constants.js";
import "./WeatherCard.css";
import cloudy_group from "../../../../assets/images/cloudy_group.svg";
import getCityAndWeather from "../../../../utils/weatherAPI.js";

function WeatherCard() {
  const [currentTemp, setCurrentTemp] = useState("");

  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => setCurrentTemp(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="weatherCard__container">
      <img
        src={cloudy_group}
        alt="cloudy group image"
        className="weatherCard__container_image"
      />
      <p className="weatherCard__container__title">
        {Math.round(currentTemp.temperature)}&deg; F
      </p>
    </section>
  );
}

export default WeatherCard;
