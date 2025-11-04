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
import LoadingSpinner from "./App/LoadingSpinner/LoadingSpinner.jsx";

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
    name: "",
    email: "",
    password: "",
    _id: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initial data loading - all requests in parallel
  useEffect(() => {
    setIsLoading(true);
    const jwt = getToken();

    const promises = [];

    // Load user data if token exists
    if (jwt) {
      promises.push(
        auth
          .getUser(jwt)
          .then(({ name, email, password, _id, avatar }) => {
            setIsLoggedIn(true);
            setCurrentUser({ name, email, password, _id, avatar });
          })
          .catch((e) => console.error(e))
      );
    }

    // Load clothing items
    promises.push(
      api
        .getClothingItems()
        .then((data) => {
          setClothingItems(data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        })
    );

    // Load weather data
    promises.push(
      apiWeather
        .getCityAndWeather(latitude, longitude, APIKey)
        .then((data) => {
          setTemp(data.temperature[currentTemperatureUnit]);
          setCity(data.city);
          setFeeling(data.feeling);
          setWeather(data.weather);
          setDayTime(data.dayTime);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
        })
    );

    // Wait for all requests to complete
    Promise.all(promises).finally(() => {
      setIsLoading(false);
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
    setIsLoading(true);
    api
      .deleteClothingItem(card._id)
      .then(() => {
        handleDeletingtheItem(card);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting the card", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeletingtheItem(card) {
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== card._id)
    );
  }

  // Handling Submits

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function onAddItem(values) {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddItemSubmit(item) {
    setIsLoading(true);
    setClothingItems([item, ...clothingItems]);
    setIsLoading(false);
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
      setIsLoading(true);
      await auth.signup(values);
      const data = await auth.signin({
        email: values.email,
        password: values.password,
      });
      if (data.token) {
        setToken(data.token);
        const user = await auth.getUser(data.token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      }
      handleCloseModal();
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (values) => {
    if (!values.email || !values.password) return;
    try {
      setIsLoading(true);
      const data = await auth.signin(values);
      if (data.token) {
        setToken(data.token);
        const user = await auth.getUser(data.token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
        handleCloseModal();
      }
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // Handling Likes

  const handleCardLike = ({ _id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? api
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              <Suspense fallback={<LoadingSpinner />}>
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
                        onCardLike={handleCardLike}
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
                          handleCardLike={handleCardLike}
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
              buttonText={isLoading ? "Adding new item..." : "Add New Item"}
              onClose={handleCloseModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              name="add-item_modal"
              onAddItem={onAddItem}
              isLoading={isLoading}
              setModal={setModal}
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
              setModal={setModal}
            />
            <RegisterModal
              title="Sign Up"
              name="register_modal"
              onClose={handleCloseModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              buttonText={isLoading ? "Saving..." : "Next"}
              handleSignup={handleSignup}
              isLoading={isLoading}
              setModal={setModal}
            ></RegisterModal>
            <LoginModal
              setModal={setModal}
              title="Log in"
              name="login_modal"
              onClose={handleCloseModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              buttonText={isLoading ? "Logging In..." : "Log In"}
              handleSignIn={handleSignIn}
            ></LoginModal>
            <EditProfileModal
              title="Change Profile Data"
              name="edit-profile_modal"
              onClose={handleCloseModal}
              setModal={setModal}
              activeModal={activeModal}
              onHover={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
              buttonText={isLoading ? "Saving..." : "Save changes"}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            ></EditProfileModal>
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
