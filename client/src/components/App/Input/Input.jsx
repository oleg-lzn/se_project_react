import React from "react";
import "./Input.css";

function Input({ values, errors, handleChange }) {
  return (
    <>
      <div className="modal__form-group">
        <label htmlFor="name" className="modal__lable">
          Name* {""}
          <input
            name="name"
            className={`modal__input ${
              errors.name ? "modal__input_type_error" : ""
            }`}
            type="text"
            placeholder="Name"
            required
            id="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.name}</span>
      </div>
      <div className="modal__form-group">
        <label htmlFor="imageUrl" className="modal__lable">
          Image* {""}
          <input
            name="url"
            className={`modal__input ${
              errors.url ? "modal__input_type_error" : ""
            }`}
            type="url"
            placeholder="Image URL"
            required
            id="imageUrl"
            value={values.url}
            onChange={handleChange}
          />
        </label>
        <span className="modal__input-error">{errors.url}</span>
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="radio"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={values.radio === "hot"}
            onChange={handleChange}
            required
          />{" "}
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="radio"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={values.radio === "warm"}
            onChange={handleChange}
            required
          />{" "}
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="radio"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={values.radio === "cold"}
            onChange={handleChange}
            required
          />{" "}
          <span>Cold</span>
        </label>
        <span className="modal__input-error">{errors.radio}</span>
      </fieldset>
    </>
  );
}

export default Input;
