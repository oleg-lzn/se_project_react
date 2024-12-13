import { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";
import Main from "./App/Main/Main.jsx";
import getCityAndWeather from "../utils/weatherAPI.js";
import { latitude, longitude, APIKey } from "../utils/constants.js";
import ModalWithForm from "./App/ModalWithForm/ModalWithForm.jsx";
import ItemModal from "./App/ItemModal/ItemModal.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./App/PageNotFound/PageNotFound.jsx";
import Profile from "./App/Main/Profile/Profile.jsx";
import AddItemModal from "./App/AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "./App/ConfirmationModal/ConfirmationModal.jsx";

function App() {
  const [city, setCity] = useState("Default city");
  const [temp, setTemp] = useState("Default temp");
  const [feeling, setFeeling] = useState("Default feeling");
  const [activeModal, setModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState("sunny");
  const [dayTime, setDayTime] = useState("day");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState("");

  // Getting the initial data from the API.

  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setCity(data.city);
        setTemp(data.temperature[currentTemperatureUnit]);
        setFeeling(data.feeling);
        setWeather(data.weather);
        setDayTime(data.dayTime);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, [currentTemperatureUnit]);

  // Managing toggle switch for degrees change

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  // Managing Modal States

  function handlePopupState(name) {
    setModal(name);
  }

  function handleCardClick(card, name) {
    handlePopupState(name);
    setSelectedCard(card);
  }

  //this one duplicates the one above, essentially they have the same functionality
  function openConfirmationModal(card, name) {
    handlePopupState(name);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    // makes the API call
    setClothingItems(clothingItems.filter((item) => item.id !== card)); // логика удаления карточки, проверить аргумент
    handleCloseModal();
  }

  function handleCloseModal() {
    setModal("");
  }

  function onAddItem(values) {
    console.log(values);
  }

  function handleAddItemSubmit() {
    setClothingItems([item, ...clothingItems]); // логика добавления айтема в массив
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
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__wrapper">
            <Header
              city={city}
              openModalButton={handlePopupState}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
            />
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="se_project_react/"
                element={
                  <Main
                    temp={temp}
                    feeling={feeling}
                    handleCardClick={handleCardClick}
                    weather={weather}
                    dayTime={dayTime}
                  />
                }
              />
              <Route
                path="se_project_react/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    name="image_modal"
                    addItemButton={handlePopupState}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            title="New Garment"
            buttonText="Add New Item"
            onClose={handleCloseModal}
            activeModal={activeModal}
            onHover={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
            name="add-item_modal"
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            feeling={feeling}
            onClose={handleCloseModal}
            activeModal={activeModal}
            onHover={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
            name="image_modal"
            card={selectedCard}
            openConfirmationModal={openConfirmationModal}
          />
          <ConfirmationModal
            onClose={handleCloseModal}
            activeModal={activeModal}
            name="confirmation_modal"
            card={selectedCard}
            onHover={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
