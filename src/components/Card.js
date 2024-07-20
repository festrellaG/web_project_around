import imageTrash from "../images/trash.png";

export class Card {
  constructor(
    data,
    userId,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    handleCardDisLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    /*this._cardId = data._id;*/
    this._owner = data.owner;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardDislike = handleCardDisLike;
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
    this._btnDelete.src = imageTrash;
    if (this._owner._id !== this._userId) {
      this._btnDelete.remove();
    }

    this._galleryImage = this._card.querySelector(".gallery__image");
    this._galleryCont = this._card.querySelector(".gallery__content-text");
    this._galleryTitle = this._galleryCont.querySelector(
      ".gallery__title-item"
    );
    this._btnLike = this._galleryCont.querySelector(".gallery__like");
    this.likesCounter = this._galleryCont.querySelector(
      ".gallery__like-number"
    );

    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryTitle.textContent = this._name;
    this.likesCounter.textContent = this._likes.length;
  }

  removeCard() {
    this._card.remove();
  }

  loadLikes(likes) {
    this._likes = likes;
    this.likesCounter.textContent = likes.length;
  }

  validateLike() {
    //indica si el usuario ha dado like o no a una tarjeta
    const hasUserLiked = this._likes.some((like) => like._id === this._userId);
    return hasUserLiked;
  }

  _setEventListeners() {
    //Eventos generales para dar like, eliminar y abrir popup
    this._btnLike.addEventListener("click", () => {
      //valida si el usuario ha dado like o no
      this._btnLike.classList.toggle("gallery__like_active");

      //lógica para dar like o quitar like
      const hasUserLiked = this.validateLike();
      if (hasUserLiked) {
        this._handleCardDislike(this._id);
      } else {
        this._handleCardLike(this._id);
      }
    });

    //valida si el usuario ha dado like o no y cambia el color del botón
    const hasUserLiked = this.validateLike();
    if (hasUserLiked) {
      this._btnLike.classList.add("gallery__like_active");
    } else {
      this._btnLike.classList.remove("gallery__like_active");
    }

    //if (this.owner._id !== this.userId) {
    //Evento para eliminar card
    this._btnDelete.addEventListener("click", () => {
      this._handleCardDelete(this._id);
    });
    //}

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
