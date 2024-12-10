import { useState, useEffect } from "react";
import ItemCard from "./ItemCard/ItemCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../../utils/items";
import "./Main.css";

function Main({ temp, feeling, handleCardClick, weather, dayTime }) {
  // console.log(props);
  const [currentTemp, setCurrentTemp] = useState("Loading temperature..");

  useEffect(() => {
    setCurrentTemp(temp);
  }, [temp]);

  return (
    <main className="main">
      <WeatherCard temp={temp} weather={weather} dayTime={dayTime} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(currentTemp)}&deg;F / You may want to wear
        </p>

        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === feeling;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onImageClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
