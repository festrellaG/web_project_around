export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  //-------------------------- Validación de los campos del formulario, muestra o quita errores
  _showInputError(inputElement, errorMessage, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.inputErrorActive);
  }

  _hideInputError(inputElement, formElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.inputErrorActive);
    errorElement.textContent = "";
  }

  //-------------------------- Verifica si el input es válido
  _checkInputValidity(inputElement, formElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        formElement
      );
    } else {
      this._hideInputError(inputElement, formElement);
    }
  }

  //-------------------------- Verifica si hay campos inválidos
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return (
        !inputElement.validity.valid || inputElement.value.trim().length === 0
      );
    });
  }

  //-------------------------- Cambia el estado del botón
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  //-------------------------- Obtiene los inputs por formulario y les añade eventos
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._addEventInputAndValidate(
        inputElement,
        inputList,
        buttonElement,
        this._formElement
      );
    });
  }

  _addEventInputAndValidate(
    inputElement,
    inputList,
    buttonElement,
    formElement
  ) {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement, formElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  _getSubmit() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }

  //-------------------------- Itera todos los formularios y les añade los eventos
  enableValidation() {
    this._getSubmit();
    this._setEventListeners();
  }
}
