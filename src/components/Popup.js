export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //abre la ventana emergente
  open() {
    this._popupElement.classList.add("popup_generate");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //cierra la ventana emergente
  close() {
    this._popupElement.classList.remove("popup_generate");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Al presionar la tecla "Escape", se cierra la ventana emergente
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Al realizar click fuera de la ventana emergente, se cierra
  handleClickOutside(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  //Detector de eventos
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", (evt) => {
      this.handleClickOutside(evt);
    });
  }
}
