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
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../utils/api.js";

function App() {
  const [city, setCity] = useState("Default city");
  const [temp, setTemp] = useState("Default temp");
  const [feeling, setFeeling] = useState("Default feeling");
  const [activeModal, setModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState("sunny");
  const [dayTime, setDayTime] = useState("day");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Getting the initial data from the API.
  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setCity(data.city);
        setFeeling(data.feeling);
        setWeather(data.weather);
        setDayTime(data.dayTime);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  // Made a separate useEffect, not to fetch other data, because of change in current temp unit
  useEffect(() => {
    getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setTemp(data.temperature[currentTemperatureUnit]);
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

  // deleted handlePopupstate, changed to setter function everywhere in the code

  function handleCardClick(card, name) {
    setModal(name);
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setModal("");
  }

  //this one duplicates the one above, essentially they have the same functionality
  function openConfirmationModal(card, name) {
    setModal(name);
    setSelectedCard(card);
  }

  // Delete card

  // Comment to the reviewer. Now I export 3 api functions from the api.js file.
  // Do you mean, that I need to create a React class component there or a js class there
  // , export it here, instantiate and then use with the function like api.deleteClothingItem ?

  function onDelete(card) {
    console.log("Данные карточки для удаления", card);
    deleteClothingItem(card._id)
      .then(() => {
        handleDeletingtheItem(card);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting the card", err);
      });
  }

  function handleDeletingtheItem(card) {
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== card._id)
    );
  }

  // Adding a card

  function onAddItem(values) {
    console.log(values);
    addClothingItem(values)
      .then((item) => {
        if (item) {
          handleAddItemSubmit(item);
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.error("Error adding new element", err);
      });
  }

  function handleAddItemSubmit(item) {
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__wrapper">
            <Header
              city={city}
              openModalButton={setModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
            />
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="/"
                element={
                  <Main
                    temp={temp}
                    feeling={feeling}
                    handleCardClick={handleCardClick}
                    weather={weather}
                    dayTime={dayTime}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    name="image_modal"
                    addItemButton={setModal}
                    clothingItems={clothingItems}
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
            onDelete={onDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
