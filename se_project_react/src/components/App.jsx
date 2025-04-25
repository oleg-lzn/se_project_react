import React, { useState, useEffect, Suspense } from "react";
import { Navigate, useLocation, navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../components/App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";
import Main from "./App/Main/Main.jsx";
import getCityAndWeather from "../utils/weatherAPI.js";
import { latitude, longitude, APIKey } from "../utils/constants.js";
import ItemModal from "./App/ItemModal/ItemModal.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./App/PageNotFound/PageNotFound.jsx";
import AddItemModal from "./App/AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "./App/ConfirmationModal/ConfirmationModal.jsx";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../utils/api.js";
import RegisterModal from "./App/RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "./App/ProtectedRoute/ProtectedRoute.jsx";
import LoginModal from "./App/LoginModal/LoginModal.jsx";
import * as auth from "../utils/auth.js";
import useFormAndValidation from "../../hooks/useFormAndValidation.js";
import { useIsLoggedIn } from "./App/LoggedInWrapper/LoggedInWrapper.jsx";
import { getToken, setToken } from "../utils/token.js";

const Profile = React.lazy(() =>
  import("../components/App/Main/Profile/Profile.jsx")
);

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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { values } = useFormAndValidation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }

    auth
      .getUser(jwt)
      .then(({ email, password }) => {
        setIsLoggedIn(true);
        setUserData({ email, password });
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        console.log(data);
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

  function onDelete(card) {
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
    setClothingItems([item, ...clothingItems]);
  }

  // Managing Button Animations

  function handleMouseEnter(e) {
    e.target.classList.add("hover");
  }

  function handleMouseLeave(e) {
    e.target.classList.remove("hover");
  }

  // Managing Log In and Registration

  const handleSignup = async (values) => {
    try {
      await auth.signup(values);
      navigate("/login");
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleSignIn = async (values) => {
    if (!values.email || !values.password) return;
    try {
      const data = await auth.signin(values);
      if (data.jwt) {
        setToken(data.jwt);
        setUserData(data.user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/items";
        navigate(redirectPath);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

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
            <Suspense fallback={<div>Loading...</div>}>
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
                    <ProtectedRoute>
                      <Profile
                        handleCardClick={handleCardClick}
                        name="image_modal"
                        addItemButton={setModal}
                        clothingItems={clothingItems}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
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
          <RegisterModal
            title="Sign Up"
            name="register_modal"
            onClose={handleCloseModal}
            activeModal={activeModal}
            onHover={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
            buttonText="Next"
          ></RegisterModal>
          <LoginModal
            title="Log in"
            name="login_modal"
            onClose={handleCloseModal}
            activeModal={activeModal}
            onHover={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
            buttonText="Log in"
          ></LoginModal>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
