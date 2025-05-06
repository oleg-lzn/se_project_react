import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { latitude, longitude, APIKey } from "../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from "./App/Header/Header.jsx";
import Footer from "./App/Footer/Footer.jsx";
import Main from "./App/Main/Main.jsx";
import PageNotFound from "./App/PageNotFound/PageNotFound.jsx";
import AddItemModal from "./App/AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "./App/ConfirmationModal/ConfirmationModal.jsx";
import RegisterModal from "./App/RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "./App/ProtectedRoute/ProtectedRoute.jsx";
import LoginModal from "./App/LoginModal/LoginModal.jsx";
import ItemModal from "./App/ItemModal/ItemModal.jsx";
import * as auth from "../utils/auth.js";
import * as api from "../utils/api.js";
import * as apiWeather from "../utils/weatherAPI.js";
import { getToken, setToken } from "../utils/token.js";
import EditProfileModal from "./App/EditProfileModal/EditProfileModal.jsx";

const Profile = React.lazy(() => import("./App/Main/Profile/Profile.jsx"));

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
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    _id: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Getting the initial data from the API.
  // Authentication

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }

    auth
      .getUser(jwt)
      .then(({ email, password, _id, avatar }) => {
        setIsLoggedIn(true);
        setCurrentUser({ email, password, _id, avatar });
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    apiWeather
      .getCityAndWeather(latitude, longitude, APIKey)
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

  useEffect(() => {
    apiWeather
      .getCityAndWeather(latitude, longitude, APIKey)
      .then((data) => {
        setTemp(data.temperature[currentTemperatureUnit]);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, [currentTemperatureUnit]);

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  // Managing Modal States

  function handleCardClick(card, name) {
    setModal(name);
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setModal("");
  }

  function openConfirmationModal(card, name) {
    setModal(name);
    setSelectedCard(card);
  }

  // Delete card

  function onDelete(card) {
    api
      .deleteClothingItem(card._id)
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
    api
      .addClothingItem(values)
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
      handleCloseModal();
      navigate("/");
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleSignIn = async (values) => {
    if (!values.email || !values.password) return;
    try {
      const data = await auth.signin(values);
      console.log({ data });
      if (data.token) {
        setToken(data.token);
        const user = await auth.getUser(data.token);
        console.log({ user });
        setCurrentUser(user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app">
            <div className="app__wrapper">
              <Header
                city={city}
                setModal={setModal}
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
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          handleCardClick={handleCardClick}
                          name="image_modal"
                          addItemButton={setModal}
                          clothingItems={clothingItems}
                          setModal={setModal}
                          activeModal={activeModal}
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
              handleSignup={handleSignup}
            ></RegisterModal>
            <LoginModal
              title="Log in"
              name="login_modal"
              onClose={handleCloseModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              buttonText="Log in"
              handleSignIn={handleSignIn}
            ></LoginModal>
            <EditProfileModal
              title="Change Profile Data"
              name="edit-profile_modal"
              onClose={handleCloseModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              buttonText="Save changes"
            ></EditProfileModal>
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
