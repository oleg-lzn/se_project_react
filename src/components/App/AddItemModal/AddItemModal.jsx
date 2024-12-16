import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
function AddItemModal({
  buttonText,
  title,
  onAddItem,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  const [inputName, setInputName] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [weather, setWeather] = useState("");

  function handleInputName(e) {
    console.log(e.target.value);
    setInputName(e.target.value);
  }

  function handleInputUrl(e) {
    console.log(e.target.value);
    setInputUrl(e.target.value);
  }

  function handleInputWeather(e) {
    setWeather(e.target.id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onAddItem) {
      onAddItem({ inputName, inputUrl, weather });
    }
  }

  function handleCardDelete(e) {
    e.preventDefault();
  }

  useEffect(() => {
    activeModal && (setInputName(""), setInputUrl(""));
  }, [activeModal]);

  return (
    <ModalWithForm
      title={title}
      buttonText={buttonText}
      name={name}
      onClose={onClose}
      activeModal={activeModal}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
      onAddItem={handleSubmit}
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
            // onInput={checkInputValidity}
            minLength="1"
            maxLength="30"
            value={inputName}
            onChange={handleInputName}
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
            // onInput={checkInputValidity}
            minLength="1"
            maxLength="50"
            value={inputUrl}
            onChange={handleInputUrl}
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
            value={weather}
            onChange={handleInputWeather}
          />{" "}
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="temperature"
            value={weather}
            onChange={handleInputWeather}
          />{" "}
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="temperature"
            value={weather}
            onChange={handleInputWeather}
          />{" "}
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
