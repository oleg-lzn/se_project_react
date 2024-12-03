import { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";
import Main from "./App/Main/Main.jsx";
import getCityAndWeather from "../utils/weatherAPI.js";
import { latitude, longitude, APIKey } from "../utils/constants.js";
import ModalWithForm from "./App/ModalWithForm/ModalWithForm.jsx";
import ItemModal from "./App/ItemModal/ItemModal.jsx";

function App() {
  const [city, setCity] = useState("Default city");
  const [temp, setTemp] = useState("Default temp");
  const [feeling, setFeeling] = useState("Default feeling");
  const [activeModal, setModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState("sunny");
  const [dayTime, setDayTime] = useState("day");

  // Getting the initial data from the API.

  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setCity(data.city);
        setTemp(data.temperature);
        setFeeling(data.feeling);
        setWeather(data.weather);
        setDayTime(data.dayTime);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  // Managing Modal States

  function handlePopupState() {
    setModal("add_garment");
  }

  function handleCardClick(card) {
    setModal("image_modal");
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setModal("");
  }

  // Managing Esc Button functionality and outside click functionality (for all of the modals)

  useEffect(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && handleCloseModal();
    };
    activeModal && document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const handleClickClose = (e) => {
      e.target.classList.contains("modal") && handleCloseModal();
    };
    activeModal && document.addEventListener("click", handleClickClose);
    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [activeModal]);

  // Managing Button Animations

  function handleMouseEnter(e) {
    e.target.classList.add("hover");
  }

  function handleMouseLeave(e) {
    e.target.classList.remove("hover");
  }

  // Validation

  function showInputError(e, errorMessage) {
    const form = document.getElementById("modal__form");
    // if input is not valid - we'd like to take the validation message,
    const errorElement = form.querySelector(`#${e.target.id}-error`);
    // Add error class to the input and show display error message.
    e.target.classList.add("modal__input_type_error");
    errorElement.classList.add("modal__error_visible");
    errorElement.textContent = errorMessage;
  }

  function hideInputError(e) {
    const form = document.getElementById("modal__form");
    const errorElement = form.querySelector(`#${e.target.id}-error`);
    e.target.classList.remove("modal__input_type_error");
    errorElement.classList.remove("modal__error_visible");
    errorElement.textContent = "";
  }

  function checkInputValidity(e) {
    //for checking the input validity
    if (!e.target.validity.valid) {
      showInputError(e, e.target.validationMessage);
    } else {
      hideInputError(e);
    }
  }

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header
          city={city}
          openModalButton={handlePopupState}
          onHover={handleMouseEnter}
          onHoverEnd={handleMouseLeave}
        />
        <Main
          temp={temp}
          feeling={feeling}
          handleCardClick={handleCardClick}
          weather={weather}
          dayTime={dayTime}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        name="add_garment"
        onClose={handleCloseModal}
        activeModal={activeModal}
        onHover={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
      >
        <div className="modal__form-group">
          <label htmlFor="name" className="modal__lable">
            Name* {""}
            <input
              className="modal__input"
              type="text"
              placeholder="Name"
              required
              id="name"
              onInput={checkInputValidity}
            />
          </label>
          <span className="modal__error" id="name-error">
            Please enter correct name
          </span>
        </div>
        <div className="modal__form-group">
          <label htmlFor="imageUrl" className="modal__lable">
            Image* {""}
            <input
              className="modal__input"
              type="url"
              placeholder="Image URL"
              required
              id="imageUrl"
              onInput={checkInputValidity}
            />
          </label>
          <span className="modal__error" id="imageUrl-error">
            This is not a valid URL
          </span>
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
            <span>Hot</span>
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
            <span>Warm</span>
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
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        feeling={feeling}
        onClose={handleCloseModal}
        activeModal={activeModal}
        onHover={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        name="image_modal"
        card={selectedCard}
      />
    </div>
  );
}

export default App;
