import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import cloudy_group from "../../../../assets/images/cloudy_group.svg";
import { weatherConditions } from "../../../../utils/weather_conditions.js";
import { CurrentTemperatureUnitContext } from "../../../../../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ temp, weather, dayTime }) {
  const [currentTemp, setCurrentTemp] = useState("Loading temperature...");
  const [currentWeatherImage, setCurrentWeatherImage] = useState("sunny");

  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  useEffect(() => {
    setCurrentTemp(temp);
  }, [temp]);

  useEffect(() => {
    const currentImage = getWeatherImage(weather, dayTime);
    setCurrentWeatherImage(currentImage);
  }, [weather, dayTime]);

  function getWeatherImage(weather, dayTime) {
    const weatherImage = weatherConditions.find((item) => {
      return item.weather === weather && item.time === dayTime;
    });

    return weatherImage.image;
  }

  return (
    <section className="weatherCard__container">
      <img
        src={currentWeatherImage || cloudy_group}
        alt="weather image"
        className="weatherCard__container_image"
      />
      <p className="weatherCard__container__title">
        {Math.round(currentTemp)}&deg;{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
