import { useCallback, useState } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({
    name_input: "",
    url_input: "",
    radio_input: "",
    email_input: "",
    password_input: "",
  });
  const [errors, setErrors] = useState({
    name_input: "",
    url_input: "",
    radio_input: "",
    email_input: "",
    password_input: "",
  });
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: e.target.validationMessage,
    }));
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
