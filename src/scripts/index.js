import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  btEdit,
  btAdd,
  galleryContent,
  btClose,
  btCloseCardNew,
  profileName,
  profileDesc,
  nameNewCard,
  jobNewCard,
  btnClosePicPop,
  btnRemove,
  imageProfile,
  btnCloseChange,
} from "./utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import imageLogo from "../images/logo_header.png";
import imagePencil from "../images/edit_profile.png";
import imageAdd from "../images/add_icon.png";
import closePopup from "../images/close_icon.png";
import imageEditPencil from "../images/lapiz.png";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//----------------------IMAGENES IMPORTADAS----------------------
document.querySelector("#image-logo").src = imageLogo;
document.querySelector("#image-pencil").src = imagePencil;
document.querySelector("#image-add").src = imageAdd;
document.querySelector("#close-profile").src = closePopup;
document.querySelector("#close-card").src = closePopup;
document.querySelector("#close-show").src = closePopup;
document.querySelector("#close-delete").src = closePopup;
document.querySelector("#close-change").src = closePopup;
document.querySelector("#image-edit-pencil").src = imageEditPencil;

//--------------------------------API----------------------------
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "f2d5b74c-c626-4038-b275-b200d36582b5",
    "Content-Type": "application/json",
  },
});

//----------------------PERFIL----------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__face-image",
  id: "",
});

//----------------------API CARGA PERFIL----------------------
api.getProfileInfo().then((result) => {
  userInfo.setUserInfo(result);
});

//----------------------FUNCIONES DE TARJETAS----------------------
function handleCardClick(name, link) {
  const popupImage = new PopupWithImage({ name, link }, "#popup-show_id");
  //abre imagen y titulo en ventana emergente
  popupImage.open();

  //evento para cerrar ventana emergente
  btnClosePicPop.addEventListener("click", () => {
    popupImage.close();
  });
}

//----------------------GENERADOR DE TARJETAS----------------------
function buildFunctionsByCard(item) {
  const card = new Card(
    item,
    userInfo._userId,
    handleCardClick, //Popup con imagen
    () => {
      //Popup de borrado carta
      const popupDelete = new PopupWithConfirmation("#popup-delete", () => {
        api.removeCards(item._id).then((result) => {
          return result;
        });
      });
      popupDelete.setEventListeners();
      popupDelete.open(item._id);
      popupDelete.originalButton();
      popupDelete.setHandleSubmit((id) => {
        api.removeCards(id).then((result) => {
          card.removeCard();
        });
      });
      btnRemove.addEventListener("click", () => {
        popupDelete.close();
      });
    },
    (id) => {
      //Agrega de likes
      api.addLike(id).then((result) => {
        card.loadLikes(result.likes);
      });
    },
    (id) => {
      //Elimina likes
      api.deleteLike(id).then((result) => {
        card.loadLikes(result.likes);
      });
    }
  );
  return card;
}

//----------------------API CARGA TODAS LAS TARJETAS----------------------
api.getInitialCards().then((result) => {
  const defaultCardList = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = buildFunctionsByCard(item);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
      },
    },
    ".gallery"
  );

  defaultCardList.renderer();
});

//----------------------POPUP AVATAR----------------------
const popupAvatar = new PopupWithForm("#popup-change", (inputs) => {
  api.editProfileAvatar(inputs).then((result) => {
    userInfo.avatar.src = result.avatar;
  });
});

//generador de eventos
popupAvatar.setEventListeners();

//evento para abrir ventana emergente
imageProfile.addEventListener("click", () => {
  popupAvatar.open();
  popupAvatar.originalButton();
});

//evento para cerrar ventana emergente
btnCloseChange.addEventListener("click", () => {
  popupAvatar.close();
});

//----------------------POPUP PERFIL----------------------
const popupProfile = new PopupWithForm("#popup-profile", (inputs) => {
  api.editProfile(inputs).then((result) => {
    profileName.textContent = result.name;
    profileDesc.textContent = result.about;
  });
  //
});

//generador de eventos
popupProfile.setEventListeners();

//evento para abrir ventana emergente
btEdit.addEventListener("click", () => {
  popupProfile.open();
  popupProfile.originalButton();
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
  api.addCards({ name: inputs.title, link: inputs.link }).then((result) => {
    const newcard = buildFunctionsByCard(result);
    galleryContent.prepend(newcard.generateCard());
  });
});

//generador de eventos
popupCard.setEventListeners();

//evento para abrir ventana emergente
btAdd.addEventListener("click", () => {
  popupCard.open();
  popupCard.originalButton();
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
