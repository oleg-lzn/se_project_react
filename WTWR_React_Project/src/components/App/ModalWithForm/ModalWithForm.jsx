import { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm(props) {
  return (
    <div className="modal" id="add_clothes_id">
      <div className="modal__container">
        <h2 className="modal__name">New Garment</h2>
        <button type="button" className="modal__close"></button>
        <form className="modal__form">
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
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
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

          <button
            className="modal__button modal__button_disabled"
            type="submit"
            id="add_garment_button"
            disabled
          >
            Add Garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

{
  /* <div className="modal__form-group">
<div className="modal__checkbox-item">
  <input type="checkbox" id="hot" name="option1" />
  <label>Hot</label>
</div>
<div className="modal__checkbox-item">
  <input type="checkbox" id="warm" name="option2" />
  <label>Warm</label>
</div>
<div className="modal__checkbox-item">
  <input type="checkbox" id="cold" name="option3" />
  <label>Cold</label>
</div>
</div> */
}
