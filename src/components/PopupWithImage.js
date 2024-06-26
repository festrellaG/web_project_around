import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._card = this._popupElement.querySelector(".popup-show__container");
  }

  _setProperties() {
    this._image = this._card.querySelector(".popup-show__add");
    this._title = this._card.querySelector(".popup-show__title-create");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
  }

  open() {
    super.open();
    super.setEventListeners();
    this._setProperties();
  }
}
