import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard/ItemCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../../../contexts/CurrentTemperatureUnitContext";

function Main({
  temp,
  feeling,
  handleCardClick,
  weather,
  dayTime,
  clothingItems,
}) {
  const [currentTemp, setCurrentTemp] = useState("Loading temperature..");

  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

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

        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === feeling;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onImageClick={handleCardClick}
                  name="image_modal"
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
