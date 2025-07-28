import React from "react";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/Input";
import useFormAndValidation from "../../../../hooks/useFormAndValidation";

function AddItemModal({
  setModal,
  buttonText,
  title,
  onAddItem,
  name,
  onClose,
  activeModal,
  onHover,
  onHoverEnd,
}) {
  const { resetForm, values, isValid, errors, handleChange } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (onAddItem) {
      onAddItem(values);
    }
  }

  return (
    <ModalWithForm
      setModal={setModal}
      title={title}
      buttonText={buttonText}
      name={name}
      onClose={onClose}
      activeModal={activeModal}
      onHover={onHover}
      onHoverEnd={onHoverEnd}
      onAddItem={handleSubmit}
      isValid={isValid}
    >
      <Input
        values={values}
        isValid={isValid}
        errors={errors}
        handleChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default AddItemModal;
