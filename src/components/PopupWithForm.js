import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._btnList = this._formElement.querySelector(".popup__button");
  }

  //cierra la ventana emergente y limpia los campos del formulario
  close() {
    super.close();
    this._formElement.reset();
  }
  //recopila datos de todos los campos de entrada
  getInputValues() {
    this.formValues = {};
    this._inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  originalButton() {
    this._btnList.textContent = "Guardar";
  }

  _changesButton() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
      this._btnList.textContent = "Guardando...";
    });
  }

  //Detector de eventos
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
      this._changesButton().then(() => {
        this.close();
      });
    });
  }
}
