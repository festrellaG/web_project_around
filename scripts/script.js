/* -------------------------------- elementos obtenidos del dom*/
let container = document.querySelector(".profile");
let containerProfile = container.querySelector(".profile__container");
let dataProfile = containerProfile.querySelector(".profile__data");
let profileInfo = dataProfile.querySelector(".profile__info");

const mainContainer = document.querySelector(".main");
const galleryContent = mainContainer.querySelector(".gallery");

/* -------------------------------- genera arrays de imagenes predeterminadas*/
const initialPics = [
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

/* -------------------------------- plantilla de galeria de imagenes*/
function createGalleryItem(name, link) {
  const galleryTemplate = document.querySelector("#gallery-template").content;

  const galleryItem = galleryTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);

  const btnDelete = galleryItem.querySelector(".gallery__trash");
  const galleryImage = galleryItem.querySelector(".gallery__image");
  const galleryCont = galleryItem.querySelector(".gallery__content-text");
  const galleryTitle = galleryCont.querySelector(".gallery__title-item");
  const btnLike = galleryCont.querySelector(".gallery__like");

  btnLike.addEventListener("click", function () {
    btnLike.classList.toggle("gallery__like_active");
  });

  btnDelete.addEventListener("click", function () {
    galleryItem.remove();
  });

  galleryImage.addEventListener("click", function () {
    openPopup(link, name);
  });

  galleryImage.src = link;
  galleryImage.alt = name;
  galleryTitle.textContent = name;

  return galleryItem;
}

/* -------------------------------- itera arrays de imagenes y las inserta*/
initialPics.forEach(function (element) {
  const newItem = createGalleryItem(element.name, element.link);
  galleryContent.append(newItem);
});

/* -------------------------------- popup edicion*/
let popupEditProfile = document.querySelector(".popup");
let form = popupEditProfile.querySelector(".popup__container");
/* -------------------------------- popup agregar imagenes*/
let popupCreate = document.querySelector(".popup-picture");
let formCreate = popupCreate.querySelector(".popup-picture__container");

/* --------------------------------*/

/* -------------------------------- cerrar ventana emergente del popup de agregar imagenes*/
let btClosePic = formCreate.querySelector(".popup-picture__close");

btClosePic.addEventListener("click", function () {
  popupCreate.style.display = "none";
});

/* -------------------------------- cerrar ventana emergente del popup de edicion perfil*/
let btClose = form.querySelector(".popup__close");

btClose.addEventListener("click", () => {
  popupEditProfile.style.display = "none";
});

/* -------------------------------- abrir ventana emergente del popup de edicion perfil*/
let btEdit = dataProfile.querySelector(".profile__edit-data");
btEdit.addEventListener("click", function () {
  popupEditProfile.style.display = "block";

  let nameUp = form.querySelector(".popup__name-update");
  let DescUp = form.querySelector(".popup__desc-update");

  let name = profileInfo.querySelector(".profile__name");
  let desc = dataProfile.querySelector(".profile__description");

  nameUp.value = name.textContent;
  DescUp.value = desc.textContent;
});

/* -------------------------------- abrir ventana emergente del popup de agregar imagenes*/
let btAdd = containerProfile.querySelector(".profile__add-picture");
btAdd.addEventListener("click", () => {
  popupCreate.style.display = "block";

  let nameU = formCreate.querySelector(".popup-picture__name-create");
  let DescU = formCreate.querySelector(".popup-picture__link-create");

  nameU.value = "";
  DescU.value = "";
});

/* -------------------------------- salvar los campos del formulario en la página del popup de edicion perfil*/
let saveProfile = form.querySelector(".popup__buton-update");

saveProfile.addEventListener("click", function (evt) {
  let nameU = profileInfo.querySelector(".profile__name");
  let descU = dataProfile.querySelector(".profile__description");

  let nameUpa = form.querySelector(".popup__name-update");
  let DescUpa = form.querySelector(".popup__desc-update");

  nameU.textContent = nameUpa.value;
  descU.textContent = DescUpa.value;

  popupEditProfile.style.display = "none";
  evt.preventDefault();
});

/* -------------------------------- salvar los campos del formulario en la página del popup de agregar imagenes*/
formCreate.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let nameC = formCreate.querySelector(".popup-picture__name-create");
  let DescC = formCreate.querySelector(".popup-picture__link-create");

  const itemToAdd = createGalleryItem(nameC.value, DescC.value);
  galleryContent.prepend(itemToAdd);

  popupCreate.style.display = "none";
});

/* -------------------------------- abre popup para agregar imagenes nuevas*/
function openPopup(link, name) {
  const popupPic = document.querySelector(".popup-show");
  const popupPicCont = popupPic.querySelector(".popup-show__container");
  const btnClosePicPop = popupPicCont.querySelector(".popup-show__close");
  const popupPicImage = popupPicCont.querySelector(".popup-show__add");
  const popupPicTitle = popupPicCont.querySelector(".popup-show__title-create");

  popupPicImage.src = link;
  popupPicImage.alt = name;
  popupPicTitle.textContent = name;

  popupPic.style.display = "block";

  btnClosePicPop.addEventListener("click", function () {
    popupPic.style.display = "none";
  });
}

/* --------------------------------*/
