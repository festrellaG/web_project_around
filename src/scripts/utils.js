/* -------------------------------- elementos obtenidos del dom*/
const container = document.querySelector(".profile");
export const containerProfile = container.querySelector(".profile__container");
export const dataProfile = containerProfile.querySelector(".profile__data");

const mainContainer = document.querySelector(".main");
export const galleryContent = mainContainer.querySelector(".gallery");

/* -------------------------------- abre popup para agregar imagenes nuevas*/
export const popupShow = document.querySelector(".popup-show");
const popupPicCont = popupShow.querySelector(".popup-show__container");
export const btnClosePicPop = popupPicCont.querySelector(".popup-show__close");
export const popupPicImage = popupPicCont.querySelector(".popup-show__add");
export const popupPicTitle = popupPicCont.querySelector(
  ".popup-show__title-create"
);

/* -------------------------------- popup edicion*/
export const btEdit = dataProfile.querySelector(".profile__edit-data");

/* -------------------------------- cerrar ventana emergente del popup de edicion perfil desde boton "X"*/
export const btClose = document.querySelector("#close-profile");

/* -------------------------------- abrir ventana emergente del popup de edicion perfil*/
export const profileName = document.querySelector(".profile__name");
export const profileDesc = document.querySelector(".profile__description");

/* -------------------------------- popup card nueva*/
export const btAdd = containerProfile.querySelector(".profile__add-picture");
export const nameNewCard = document.querySelector("#input-name");
export const jobNewCard = document.querySelector("#input-desc");

/* -------------------------------- cerrar ventana emergente del popup de card nueva desde boton "X"*/
export const btCloseCardNew = document.querySelector("#close-card");
