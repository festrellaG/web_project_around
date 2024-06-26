import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  btEdit,
  btAdd,
  galleryContent,
  btClose,
  btCloseCardNew,
  nameNewCard,
  jobNewCard,
  btnClosePicPop,
} from "./utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import imageLogo from "../images/logo_header.png";
import imageProfile from "../images/avatar.png";
import imagePencil from "../images/edit_profile.png";
import imageAdd from "../images/add_icon.png";
import closePopup from "../images/close_icon.png";
import arrayImageOne from "../images/kirill-pershin_1.png";
import arrayImageTwo from "../images/kirill-pershin_2.png";
import arrayImageTree from "../images/kirill-pershin_3.png";
import arrayImageFour from "../images/kirill-pershin_4.png";
import arrayImageFive from "../images/kirill-pershin_5.png";
import arrayImageSix from "../images/kirill-pershin_6.png";
import imageTrash from "../images/trash.png";

//----------------------IMAGENES IMPORTADAS----------------------
document.querySelector("#image-logo").src = imageLogo;
document.querySelector("#image-profile").src = imageProfile;
document.querySelector("#image-pencil").src = imagePencil;
document.querySelector("#image-add").src = imageAdd;
document.querySelector("#close-profile").src = closePopup;
document.querySelector("#close-card").src = closePopup;
document.querySelector("#close-show").src = closePopup;

//actualiza el src de las imagenes tanto a la carga inicial como despues de crear una nueva carta
function updateTrashBinImages() {
  const trashImages = document.querySelectorAll(".gallery__image-trash");
  trashImages.forEach((image) => {
    image.src = imageTrash; //actualiza el src de la imagen
  });
}

/* -------------------------------- genera arrays de imagenes predeterminadas*/
export const initialPics = [
  {
    name: "Valle de Yosemite",
    link: arrayImageOne,
  },
  {
    name: "Lago Louise",
    link: arrayImageTwo,
  },
  {
    name: "Montañas Calvas",
    link: arrayImageTree,
  },
  {
    name: "Latemar",
    link: arrayImageFour,
  },
  {
    name: "Vanoise National Park",
    link: arrayImageFive,
  },
  {
    name: "Lago di Braies",
    link: arrayImageSix,
  },
];

//----------------------LISTA DE ELEMENTOS DE ESTA PAGINA----------------------
const defaultCardList = new Section(
  {
    items: initialPics,
    renderer: (item) => {
      const card = new Card(item.name, item.link, (nameParam, linkParam) => {
        const popupImage = new PopupWithImage(
          { name: nameParam, link: linkParam },
          "#popup-show_id"
        );
        //abre imagen y titulo en ventana emergente
        popupImage.open();

        //evento para cerrar ventana emergente
        btnClosePicPop.addEventListener("click", () => {
          popupImage.close();
        });
      });
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  ".gallery"
);

defaultCardList.renderer();

document.addEventListener("DOMContentLoaded", function () {
  updateTrashBinImages();
});

//----------------------USUARIO----------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

//----------------------POPUP PERFIL----------------------
//creacion de la clase PopupWithForm
const popupProfile = new PopupWithForm("#popup-profile", (inputs) => {
  userInfo.setUserInfo({ name: inputs.name, job: inputs.job });
});

//generador de eventos
popupProfile.setEventListeners();

//evento para abrir ventana emergente
btEdit.addEventListener("click", () => {
  popupProfile.open();
  const us = userInfo.getUserInfo();
  nameNewCard.value = us.name;
  jobNewCard.value = us.job;
});

//evento para cerrar ventana emergente
btClose.addEventListener("click", () => {
  popupProfile.close();
});

//----------------------POPUP NUEVA CARTA----------------------
const popupCard = new PopupWithForm("#popup-picture", (inputs) => {
  const newcard = new Card(
    inputs.title,
    inputs.link,
    (nameParam, linkParam) => {
      const popupImage = new PopupWithImage(
        { name: nameParam, link: linkParam },
        "#popup-show_id"
      );
      //abre imagen y titulo en ventana emergente
      popupImage.open();

      //evento para cerrar ventana emergente
      btnClosePicPop.addEventListener("click", () => {
        popupImage.close();
      });
    }
  );
  galleryContent.prepend(newcard.generateCard());
  updateTrashBinImages();
});

//generador de eventos
popupCard.setEventListeners();

//evento para abrir ventana emergente
btAdd.addEventListener("click", () => {
  popupCard.open();
});

//evento para cerrar ventana emergente
btCloseCardNew.addEventListener("click", () => {
  popupCard.close();
});

//----------------------VALIDACIONES----------------------

//Validación de los campos del formulario
const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((formElement) => {
  //iteracion de formularios
  const validator = new FormValidator(
    {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_inactive",
      inputErrorClass: "popup__input_type_error",
      inputErrorActive: "popup__input-error_active",
      errorClass: ".popup__error",
    },
    formElement
  );
  validator.enableValidation();
});
