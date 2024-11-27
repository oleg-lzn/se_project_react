import { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";
import Main from "./App/Main/Main.jsx";
import getCityAndWeather from "../utils/weatherAPI.js";
import { latitude, longitude, APIKey } from "../utils/constants.js";
import ModalWithForm from "./App/ModalWithForm/ModalWithForm.jsx";

function App() {
  const [city, setCity] = useState("Default city");
  const [temp, setTemp] = useState("Default temp");
  const [feeling, setFeeling] = useState("Default feeling");

  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setCity(data.city);
        setTemp(data.temperature);
        setFeeling(data.feeling);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header city={city} />
        <Main temp={temp} feeling={feeling} />
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;

// function handleClick() {
//   document.getElementById("add_clothes_id").classList.add("modal_open");
// }

// useEffect(() => {
//   setModalState(openModal);
// });

// function closePopup(evt) {
//   evt.target.classList.remove("popup_open");
// }

// useEffect(() => {
//   setModalState();
// });

// function onClose() {
//   evt.target.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("popup") ||
//       evt.target.classList.contains("popup__close")
//     ) {
//       setModalState(closePopup);
//     }
//   });
// }

//   const [open, openModal] = useState("close");
