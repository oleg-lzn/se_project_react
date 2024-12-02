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
  const [activeModalState, setModalState] = useState("");
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
    setModalState("add_garment");
  }

  function handleCardClick(card) {
    setModalState("image_modal");
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setModalState("");
  }

  // Managing Esc Button functionality and outside click functionality (for all of the modals)

  useEffect(() => {
    const handleEscClose = (e) => {
      e.key === "Escape" && setModalState("");
    };
    activeModalState && document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModalState]);

  useEffect(() => {
    const handleClickClose = (e) => {
      e.target.classList.contains("modal") && setModalState("");
    };

    activeModalState && document.addEventListener("click", handleClickClose);
    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [activeModalState]);

  // Managing Button Animations

  function handleMouseEnter(e) {
    e.target.classList.add("hover");
  }

  function handleMouseLeave(e) {
    e.target.classList.remove("hover");
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
        activeModal={activeModalState}
        onHover={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
      >
        <div className="modal__form-group">
          <label htmlFor="name" className="modal__lable">
            Name {""}
            <input
              className="modal__input"
              type="text"
              placeholder="Name"
              required
              id="name-input"
              // onInput={checkInputValidity}
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
              id="url-input"
              // onInput={checkInputValidity}
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
        activeModal={activeModalState}
        onHover={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        name="image_modal"
        card={selectedCard}
      />
    </div>
  );
}

export default App;
