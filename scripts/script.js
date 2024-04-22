let container = document.querySelector(".profile");
let btEdit = container.querySelector(".profile__edit-data");

btEdit.addEventListener("click", executePopupEditProfile);

let containerProfile = container.querySelector(".profile_container");

let profileInfo = containerProfile.querySelector(".profile__info");
let popupEditProfile = containerProfile.querySelector(".profile__popup-edit");

function executePopupEditProfile() {
  let name = profileInfo.querySelector(".profile__name");
  let desc = containerProfile.querySelector(".profile__description");

  popupEditProfile.style.display = "block";

  popupEditProfile.insertAdjacentHTML(
    "beforeend",
    `
      <img class="profile__close" src="./images/close_icon.png" alt="icono en tache para cerrar form">
      <form class="profile__editForm">
        <h1 class="profile__title-update">Edit profile</h1>
        <input type="text" class="profile__name-update" value="${name.textContent}">
        <input type="text" class="profile__desc-update" value="${desc.textContent}">
        <button class="profile__buton-update">Guardar</button>
      </form>
    `
  );
}

/* -------------------------------- */

let popup = containerProfile.querySelector(".profile__popup-edit");
let popupForm = popup.querySelector(".profile__editForm");

console.log(`Pop: ${popup.classList}`);
console.log(popupForm);

let saveProfile = popupForm.querySelector(".profile__buton-update");

saveProfile.addEventListener("click", executeSaveUpdateProfile);

function executeSaveUpdateProfile() {
  let nameUpdate = popupForm.querySelector(".profile__name-update");
  let descUpdate = popupForm.querySelector(".profile__desc-update");

  let nameU = profileInfo.querySelector(".profile__name");
  let descU = containerProfile.querySelector(".profile__description");

  nameU.textContent = nameUpdate.value;
  descU.textContent = descUpdate.value;

  popup.style.display = "none";
}

/* -------------------------------- */
