/* -------------------------------- genera arrays de imagenes predeterminadas*/
export const initialPics = [
  {
    name: "Valle de Yosemite",
    link: "./images/kirill-pershin_1.png",
  },
  {
    name: "Lago Louise",
    link: "./images/kirill-pershin_2.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/kirill-pershin_3.png",
  },
  {
    name: "Latemar",
    link: "./images/kirill-pershin_4.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/kirill-pershin_5.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/kirill-pershin_6.png",
  },
];

/* -------------------------------- elementos obtenidos del dom*/
const container = document.querySelector(".profile");
export const containerProfile = container.querySelector(".profile__container");
export const dataProfile = containerProfile.querySelector(".profile__data");
const profileInfo = dataProfile.querySelector(".profile__info");

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
export const popupEditProfile = document.querySelector("#popup-profile");
const form = popupEditProfile.querySelector(".popup__container");

/* -------------------------------- cerrar ventana emergente del popup de edicion perfil desde boton "X"*/
export const btClose = form.querySelector(".popup__close");

export function closePopupEditProfile() {
  popupEditProfile.style.display = "none";
  //Al presionar la tecla "Escape", se cierra, se quita el evento
  document.removeEventListener("keydown", closeWithKey);
}

/* -------------------------------- abrir ventana emergente del popup de edicion perfil*/
export function openProfile() {
  popupEditProfile.style.display = "block";
  let btnUp = form.querySelector(".popup__btn");
  btnUp.classList.add("popup__button_inactive");

  const errorName = form.querySelector(".input-name-error");
  errorName.textContent = "";

  const errorDesc = form.querySelector(".input-desc-error");
  errorDesc.textContent = "";

  let nameUp = form.querySelector(".popup__name");
  let DescUp = form.querySelector(".popup__desc");

  nameUp.classList.remove("popup__input_type_error");
  DescUp.classList.remove("popup__input_type_error");

  let name = profileInfo.querySelector(".profile__name");
  let desc = dataProfile.querySelector(".profile__description");

  nameUp.value = name.textContent;
  DescUp.value = desc.textContent;

  //Al presionar la tecla "Escape", se cierra, se agrega
  document.addEventListener("keydown", closeWithKey);
}

/*-------------------------- Al realizar click fuera del popup, se cierra*/
export const popupProfile = document.querySelector("#popup-profile");

export function closePopupEditProfileAll(event) {
  if (event.target === popupProfile) {
    popupProfile.style.display = "none";
  }
}

/*-------------------------------- salvar los campos del formulario en la página del popup de edicion perfil*/
export const saveProfile = form.querySelector(".popup__btn");

export function saveDataProfile(evt) {
  let nameU = profileInfo.querySelector(".profile__name");
  let descU = dataProfile.querySelector(".profile__description");

  let nameUpa = form.querySelector(".popup__name");
  let DescUpa = form.querySelector(".popup__desc");

  nameU.textContent = nameUpa.value;
  descU.textContent = DescUpa.value;

  popupEditProfile.style.display = "none";
  evt.preventDefault();
}

/*-------------------------------- salvar los campos del formulario en la página del popup de card new*/
export function saveDataImage(evt) {
  evt.preventDefault();

  let nameC = formCreate.querySelector(".popup__name");
  let DescC = formCreate.querySelector(".popup__desc");

  const cardCreate = new Card(nameC.value, DescC.value);
  galleryContent.prepend(cardCreate.generateCard());

  popupCreate.style.display = "none";
}

/* -------------------------------- popup card nueva*/
export const popupCreate = document.querySelector("#popup-picture");
export const formCreate = popupCreate.querySelector(".popup__container");

/* -------------------------------- cerrar ventana emergente del popup de card nueva desde boton "X"*/
export const btCloseCardNew = formCreate.querySelector(".popup__close");

export function closePopupCardNew() {
  popupCreate.style.display = "none";
  //Al presionar la tecla "Escape", se cierra, se quita el evento
  document.removeEventListener("keydown", closeWithKey);
}

/* -------------------------------- abrir ventana emergente del popup de card nueva*/
export function openCardNew() {
  popupCreate.style.display = "block";
  let btnCreate = formCreate.querySelector(".popup__btn");
  btnCreate.classList.add("popup__button_inactive");

  const errorPlace = formCreate.querySelector(".input-place-error");
  errorPlace.textContent = "";

  const errorLink = formCreate.querySelector(".input-link-error");
  errorLink.textContent = "";

  let nameU = formCreate.querySelector(".popup__name");
  let DescU = formCreate.querySelector(".popup__desc");

  nameU.value = "";
  DescU.value = "";

  nameU.classList.remove("popup__input_type_error");
  DescU.classList.remove("popup__input_type_error");

  //Al presionar la tecla "Escape", se cierra, se agrega
  document.addEventListener("keydown", closeWithKey);
}

/*-------------------------- Al realizar click fuera del popup, se cierra*/
export const popupCardNew = document.querySelector("#popup-picture");

export function closePopupCardNewAll(event) {
  if (event.target === popupCardNew) {
    popupCardNew.style.display = "none";
  }
}

/*-------------------------- Al presionar la tecla "Escape", se cierra*/
export function closeWithKey(evt) {
  if (evt.key == "Escape") {
    popupProfile.style.display = "none";
    popupCardNew.style.display = "none";
    popupShow.style.display = "none";
  }
}
