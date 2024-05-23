//-------------------------- Validación de los campos del formulario, muestra o quita errores
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = "";
};

//-------------------------- Verifica si el input es válido
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

//-------------------------- Verifica si hay campos inválidos
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//-------------------------- Cambia el estado del botón
const toggleButtonState = (inputList, buttonElement, settings) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

//-------------------------- Obtiene los inputs por formulario y les añade eventos
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//-------------------------- Itera todos los formularios y les añade los eventos
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

//-------------------------- Validación de los campos del formulario
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  inputErrorActive: "popup__input-error_active",
  errorClass: ".popup__error",
});

//-------------------------- Cerrar ventana emergente del popup
const popup = document.querySelector("#popup-profile");
const popupPic = document.querySelector("#popup-picture");
const popupShow = document.querySelector(".popup-show");

//-------------------------- Al realizar click fuera del popup, se cierra
popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

popupPic.addEventListener("click", function (event) {
  if (event.target === popupPic) {
    popupPic.style.display = "none";
  }
});

popupShow.addEventListener("click", function (event) {
  if (event.target === popupShow) {
    popupShow.style.display = "none";
  }
});

//-------------------------- Al presionar la tecla "Escape", se cierra
document.onkeydown = function (evt) {
  if (evt.key == "Escape") {
    popup.style.display = "none";
    popupPic.style.display = "none";
    popupShow.style.display = "none";
  }
};
