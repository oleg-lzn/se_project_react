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

  // Getting the initial data from the API.

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

  // Managing Modal States

  function handlePopupState() {
    setModalState("add_garment");
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
        <Main temp={temp} feeling={feeling} />
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
      <ItemModal />
    </div>
  );
}

export default App;
