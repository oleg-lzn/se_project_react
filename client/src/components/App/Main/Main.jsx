import React, { useState, useEffect, useContext } from "react";
import ItemCard from "./ItemCard/ItemCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Main({
  temp,
  feeling,
  handleCardClick,
  weather,
  dayTime,
  clothingItems,
}) {
  const [currentTemp, setCurrentTemp] = useState("Loading temperature..");

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { isLoggedIn } = useContext(CurrentUserContext);

  useEffect(() => {
    setCurrentTemp(temp);
  }, [temp]);

  return (
    <main className="main">
      <WeatherCard temp={temp} weather={weather} dayTime={dayTime} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(currentTemp)}&deg;{currentTemperatureUnit}/ You
          may want to wear
        </p>
        {isLoggedIn && (
          <ul className="cards__list">
            {clothingItems
              // .filter((item) => item.weather === feeling)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onImageClick={handleCardClick}
                  name="image_modal"
                />
              ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
