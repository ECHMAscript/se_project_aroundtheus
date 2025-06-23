const enableValidation = (validationOjb) => {
  const formList = Array.from(page.querySelectorAll(validationOjb.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

  
    const fieldsetList = Array.from(formElement.querySelectorAll(".form__inputs"));

    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input-fields"));
  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);

    });
  });
};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);


  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error-active");
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  


  // FIX THIS, YOU DIDN'T!

  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage);
    toggleButtonState(formElement);
    return false;
  } else {
    hideInputError(formElement, inputElement);
    toggleButtonState(formElement);
    return true;
  }
};