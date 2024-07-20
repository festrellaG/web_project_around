import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._btnList = this._formElement.querySelector(".popup__button");
  }

  open(id) {
    super.open();
    this._id = id;
  }

  setHandleSubmit(handleFormAction) {
    this._handleFormSubmit = handleFormAction;
  }

  originalButton() {
    this._btnList.textContent = "Si";
  }

  _changesButton() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
      this._btnList.textContent = "Borrando...";
    });
  }

  //Detector de eventos
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._id);
      this._changesButton().then(() => {
        this.close();
      });
    });
  }
}
