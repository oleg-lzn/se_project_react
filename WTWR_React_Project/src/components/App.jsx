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
  const [state, setModalState] = useState(true);

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

  function handleClose() {
    setModalState((prevValue) => !prevValue);
  }

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header city={city} />
        <Main temp={temp} feeling={feeling} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        name="add_garment"
        onClose={handleClose}
        state={state}
      >
        <div className="modal__form-group">
          <label htmlFor="name" className="modal__lable">
            Name {""}
            <input
              className="modal__input"
              type="text"
              placeholder="Name"
              required
              id="name"
            />
          </label>
          <span className="modal__error" id="name-input-error"></span>
        </div>
        <div className="modal__form-group">
          <label htmlFor="imageUrl" className="modal__lable">
            Image {""}
            <input
              className="modal__input"
              type="url"
              placeholder="Image URL"
              required
              id="imageUrl"
            />
          </label>
          <span className="modal__error" id="url-input-error"></span>
        </div>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="temperature"
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="temperature"
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="temperature"
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
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

// _handleEscClose(evt) {
//   if (evt.key === "Escape") {
//     this.close();
//   }

// open() {
//   this.popupElement.classList.add("popup_open");
//   document.addEventListener("keydown", this._handleEscClose);
// }

// close() {
//   this.popupElement.classList.remove("popup_open");
//   document.removeEventListener("keydown", this._handleEscClose);
// }
// }
// }

//   const [open, openModal] = useState("close");
