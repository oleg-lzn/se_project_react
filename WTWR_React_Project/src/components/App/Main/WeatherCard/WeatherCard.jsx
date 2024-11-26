import { useState, useEffect } from "react";
import "./WeatherCard.css";
import cloudy_group from "../../../../assets/images/cloudy_group.svg";

function WeatherCard(props) {
  const [currentTemp, setCurrentTemp] = useState("Loading temperature...");

  useEffect(() => {
    setCurrentTemp(props.temp);
  }, [props.temp]);

  return (
    <section className="weatherCard__container">
      <img
        src={cloudy_group}
        alt="cloudy group image"
        className="weatherCard__container_image"
      />
      <p className="weatherCard__container__title">
        {Math.round(currentTemp)}&deg; F
      </p>
    </section>
  );
}

export default WeatherCard;
