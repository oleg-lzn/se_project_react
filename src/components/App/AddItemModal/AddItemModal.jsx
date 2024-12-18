import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/Input";

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

  // Resetting the form
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
      <Input
        inputName={inputName}
        inputUrl={inputUrl}
        handleInputName={handleInputName}
        handleInputUrl={handleInputUrl}
        handleInputWeather={handleInputWeather}
        weather={weather}
      />
    </ModalWithForm>
  );
}

export default AddItemModal;
