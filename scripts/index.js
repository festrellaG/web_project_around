import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialPics,
  galleryContent,
  dataProfile,
  openProfile,
  btClose,
  closePopupEditProfile,
  popupProfile,
  closePopupEditProfileAll,
  saveProfile,
  saveDataProfile,
  btCloseCardNew,
  closePopupCardNew,
  containerProfile,
  openCardNew,
  popupCardNew,
  closePopupCardNewAll,
  formCreate,
  saveDataImage,
} from "./utils.js";

//iteracion de imagenes iniciales y su creacion de cards
initialPics.forEach(function (element) {
  const newcard = new Card(element.name, element.link);
  galleryContent.append(newcard.generateCard());
});

//evento para abrir ventana emergente de edicion de perfil
const btEdit = dataProfile.querySelector(".profile__edit-data");
btEdit.addEventListener("click", openProfile);

//evento para cerrar ventana emergente de edicion de perfil
btClose.addEventListener("click", closePopupEditProfile);

//evento para cerrar ventana emergente de edicion de perfil al hacer click fuera de la ventana
popupProfile.addEventListener("click", closePopupEditProfileAll);

//evento para salvar los campos del formulario en la página del popup de edicion perfil
saveProfile.addEventListener("submit", saveDataProfile);

//evento para cerrar ventana emergente de card new
btCloseCardNew.addEventListener("click", closePopupCardNew);

//evento para abrir ventana emergente de card new csc
const btAdd = containerProfile.querySelector(".profile__add-picture");
btAdd.addEventListener("click", openCardNew);

//evento para cerrar ventana emergente de card new al hacer click fuera de la ventana
popupCardNew.addEventListener("click", closePopupCardNewAll);

//evento para salvar los campos del formulario en la página del popup de card new
formCreate.addEventListener("submit", saveDataImage);

const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((formElement) => {
  //Validación de los campos del formulario
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
