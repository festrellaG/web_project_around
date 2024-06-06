import {
  popupShow,
  btnClosePicPop,
  popupPicImage,
  popupPicTitle,
  closeWithKey,
} from "../scripts/utils.js";

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
    this._card = this._getTemplate();
  }

  _getTemplate() {
    return document
      .querySelector("#gallery-template")
      .content.querySelector(".gallery__item")
      .cloneNode(true);
  }

  _setProperties() {
    this._btnDelete = this._card.querySelector(".gallery__trash");
    this._galleryImage = this._card.querySelector(".gallery__image");
    this._galleryCont = this._card.querySelector(".gallery__content-text");
    this._galleryTitle = this._galleryCont.querySelector(
      ".gallery__title-item"
    );
    this._btnLike = this._galleryCont.querySelector(".gallery__like");

    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryTitle.textContent = this._name;
  }

  _setEventListeners() {
    //Eventos generales para dar like, eliminar y abrir popup
    this._btnLike.addEventListener("click", () => {
      this._btnLike.classList.toggle("gallery__like_active");
    });

    this._btnDelete.addEventListener("click", () => {
      this._card.remove();
    });

    this._galleryImage.addEventListener("click", () => {
      this._openPopupShow(this._link, this._name);
    });

    //Eventos para abrir / cerrar el popup que muestra la imagen
    btnClosePicPop.addEventListener("click", function () {
      popupShow.style.display = "none";
    });

    popupShow.addEventListener("click", function (event) {
      if (event.target === popupShow) {
        popupShow.style.display = "none";
      }
    });
  }

  _openPopupShow(link, name) {
    popupShow.style.display = "block";
    popupPicImage.src = link;
    popupPicImage.alt = name;
    popupPicTitle.textContent = name;
    //Al presionar la tecla "Escape", se cierra, se agrega
    document.addEventListener("keydown", closeWithKey);
  }

  generateCard() {
    this._setProperties();
    this._setEventListeners();

    return this._card;
  }
}
