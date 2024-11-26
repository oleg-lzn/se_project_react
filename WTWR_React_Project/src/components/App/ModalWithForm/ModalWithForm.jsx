import { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm(props) {
  const [open, openModal] = useState("close");

  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close"></button>
        <p className="modal__name">New Garment</p>
        <form action="" novalidate id="add-form">
          <div class="modal__form-group">
            <input
              class="modal__input"
              className={`modal modal_type_${props.name}`}
              minlength="2"
              maxlength="40"
              type="text"
              placeholder="Name"
              required
              id="name-input"
            />
            <span class="modal__error" id="name-input-error"></span>
          </div>
          <div class="modal__form-group">
            <input
              class="modal__input"
              className={`modal modal_type_${props.link}`}
              minlength="2"
              maxlength="200"
              type="url"
              placeholder="Image URL"
              required
              id="url-input"
            />
            <span class="modal__error" id="url-input-error"></span>
          </div>
          <p className="modal__button_chose">Select the weather type:</p>
          <div class="modal__form-group">
            <div class="modal__checkbox-item">
              <input type="checkbox" id="hot" name="option1" />
              <label for="option1">{props.feeling}</label>
            </div>
            <div class="modal__checkbox-item">
              <input type="checkbox" id="warm" name="option2" />
              <label for="option2">{props.feeling}</label>
            </div>
            <div class="modal__checkbox-item">
              <input type="checkbox" id="cold" name="option3" />
              <label for="option3">{props.feeling}</label>
            </div>
          </div>
          <button
            class="modal__button modal__button_disabled"
            type="submit"
            id="add_garment_button"
            disabled
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
