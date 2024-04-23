let container = document.querySelector(".profile");
let containerProfile = container.querySelector(".profile__container");
let dataProfile = containerProfile.querySelector(".profile__data");
let profileInfo = dataProfile.querySelector(".profile__info");

let popupEditProfile = document.querySelector(".popup");
let form = popupEditProfile.querySelector(".popup__container");

/* --------------------------------*/

/* -------------------------------- cerrar ventana emergente*/
let btClose = form.querySelector(".popup__close");

btClose.addEventListener("click", closePopupEditProfile);

function closePopupEditProfile() {
  popupEditProfile.style.display = "none";
}

/* -------------------------------- abrir ventana emergente*/
let btEdit = dataProfile.querySelector(".profile__edit-data");
btEdit.addEventListener("click", executePopupEditProfile);

function executePopupEditProfile() {
  popupEditProfile.style.display = "block";

  let nameUp = form.querySelector(".popup__name-update");
  let DescUp = form.querySelector(".popup__desc-update");

  let name = profileInfo.querySelector(".profile__name");
  let desc = dataProfile.querySelector(".profile__description");

  nameUp.value = name.textContent;
  DescUp.value = desc.textContent;
}

/* -------------------------------- salvar los campos del formulario en la página*/
let saveProfile = form.querySelector(".popup__buton-update");

saveProfile.addEventListener("click", executeSaveUpdateProfile);

function executeSaveUpdateProfile(evt) {
  let nameU = profileInfo.querySelector(".profile__name");
  let descU = dataProfile.querySelector(".profile__description");

  let nameUpa = form.querySelector(".popup__name-update");
  let DescUpa = form.querySelector(".popup__desc-update");

  nameU.textContent = nameUpa.value;
  descU.textContent = DescUpa.value;

  popupEditProfile.style.display = "none";
  evt.preventDefault();
}

/* -------------------------------- cambiar el icono de me gusta*/
let gallery = document.querySelector(".gallery");
let galleryItem = gallery.querySelector(".gallery__item");
let galleryContent = galleryItem.querySelector(".gallery__content-text");
let galleryIcon = galleryContent.querySelector(".gallery__icon-heart");

let image1 = "./images/heartSignDesactive.svg";
let image2 = "./images/heartSignActive.svg";

arrayImg1 = image1.split("/");
let img1 = arrayImg1[arrayImg1.length - 1];
arrayImg2 = image2.split("/");
let img2 = arrayImg2[arrayImg2.length - 1];

function changeIconLike() {
  let array = galleryIcon.src.split("/");
  let imgIcon = array[array.length - 1];

  console.log(imgIcon.endsWith(img1));
  if (imgIcon.endsWith(img1)) {
    galleryIcon.src = image2;
  } else {
    galleryIcon.src = image1;
  }
}

galleryIcon.addEventListener("click", changeIconLike);

/* --------------------------------*/
