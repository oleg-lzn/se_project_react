import React from "react";

function Input({
  inputName,
  inputUrl,
  handleInputName,
  handleInputUrl,
  handleInputWeather,
  weather,
}) {
  return (
    <>
      <div className="modal__form-group">
        <label htmlFor="name" className="modal__lable">
          Name* {""}
          <input
            className="modal__input"
            type="text"
            placeholder="Name"
            required
            id="name"
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
            required
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
            required
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
            required
          />{" "}
          <span>Cold</span>
        </label>
      </fieldset>
    </>
  );
}

export default Input;
