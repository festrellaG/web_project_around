export class Card {
  constructor(name, link, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._card = this._getTemplate();
  }

  //Obtiene la plantilla de la tarjeta
  _getTemplate() {
    return document
      .querySelector("#gallery-template")
      .content.querySelector(".gallery__item")
      .cloneNode(true);
  }

  //Establece las propiedades de la tarjeta
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

    //Evento para eliminar card
    this._btnDelete.addEventListener("click", () => {
      this._card.remove();
    });

    //Evento para abrir imagen en ventana emergente
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //Genera la tarjeta
  generateCard() {
    this._setProperties();
    this._setEventListeners();

    return this._card;
  }
}
