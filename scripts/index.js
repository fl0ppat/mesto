import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error",
};

/** Template selector used in Card class */
const cardTemplateSelector = "#mesto";

const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".button_type_add");

/** Popups */
const popupEdit = document.querySelector("#edit");
const popupAdd = document.querySelector("#add");
const popupFull = document.querySelector("#full");

const popupFullImg = popupFull.querySelector(".popup__img");

const showName = document.querySelector(".profile__name");
const showSubtitle = document.querySelector(".profile__subtitle");

/** Edit profile form */
const formEditUserProfile = document.querySelector("#formEdit");
const nameInput = formEditUserProfile.querySelector('input[name="name"]');
const subtitleInput = formEditUserProfile.querySelector('input[name="subtitle"]');

/** Add mesto form */
const formAddCard = document.querySelector("#formAdd");
const placeTitleInput = formAddCard.querySelector('input[name="title"]');
const placeLinkInput = formAddCard.querySelector('input[name="image"]');

const grid = document.querySelector(".grid-cards");

function init() {
  editButton.addEventListener("click", () => createPopup("edit"));
  addButton.addEventListener("click", () => createPopup("add"));
  formEditUserProfile.addEventListener("submit", submitEditForm);
  formAddCard.addEventListener("submit", submitAddForm);

  // eslint-disable-next-line no-undef
  cards.forEach((elem) => {
    addCardToDOM(createCard(elem));
  });
  [formEditUserProfile, formAddCard].forEach((form) => {
    const formWithValidation = new FormValidator(validationConfig, form);
    formWithValidation.enableValidation(form);
  });
}

const callbackForCard = (imageURL, name) => {
  popupFullImg.src = imageURL;
  popupFullImg.alt, (popupFull.querySelector(".popup__full-title").textContent = name);
  createPopup("image");
};

function createCard(obj, selector = cardTemplateSelector) {
  const card = new Card(obj.link, obj.name, selector, callbackForCard);
  return card.prepareCardToPrepend();
}

function addCardToDOM(card) {
  grid.prepend(card);
}

const createPopup = (type) => {
  switch (type) {
    case "edit":
      clearInputHandler(popupEdit);
      nameInput.value = showName.textContent;
      subtitleInput.value = showSubtitle.textContent;
      popupEdit.classList.add("popup_opened");
      popupEdit
        .querySelector(validationConfig.submitButtonSelector)
        .classList.remove(validationConfig.inactiveButtonClass);
      addCloseListeners(popupEdit);
      break;

    case "add":
      clearInputHandler(popupAdd);
      popupAdd.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
      clearForm(popupAdd);
      popupAdd.classList.add("popup_opened");
      addCloseListeners(popupAdd);
      break;

    case "image":
      popupFull.classList.add("popup_opened");
      addCloseListeners(popupFull);
      break;
  }
};

const getOpenedPopup = () => {
  return document.querySelector(".popup_opened");
};

const closePopupByButton = (e) => {
  if (e.key === "Escape") {
    const popup = getOpenedPopup();
    closePopup(popup);
  }
};

const closePopupByClick = (e) => {
  const popup = getOpenedPopup();
  if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__close")) {
    closePopup(popup);
  }
};

const addCloseListeners = (popup) => {
  document.addEventListener("keydown", closePopupByButton);
  popup.addEventListener("click", closePopupByClick);
};

function clearListener(elem, event, callback) {
  elem.removeEventListener(event, callback, false);
}

function closePopup(popup) {
  clearListener(popup, "click", closePopupByClick);
  clearListener(document, "keydown", closePopupByButton);

  popup.classList.remove("popup_opened");
}

function clearForm(popup) {
  const popupForm = popup.querySelector(validationConfig.formSelector);
  popupForm.reset();
}

function clearInputHandler(popup) {
  const popupForm = popup.querySelector(validationConfig.formSelector);

  popupForm.querySelectorAll(`.${validationConfig.errorClass}_visible`).forEach((elem) => {
    elem.classList.remove(`${validationConfig.errorClass}_visible`);
  });
  popupForm.querySelectorAll(`.${validationConfig.inputErrorClass}`).forEach((elem) => {
    elem.classList.remove(`${validationConfig.inputErrorClass}`);
  });
}

const saveProfileData = (name, subtitle) => {
  showName.textContent = name;
  showSubtitle.textContent = subtitle;
};

const submitEditForm = (e) => {
  e.preventDefault();
  const popup = e.target.closest(".popup");
  if (nameInput && subtitleInput) {
    saveProfileData(nameInput.value, subtitleInput.value);
  }

  closePopup(popup);
  clearForm(popup);
};

const submitAddForm = (e) => {
  e.preventDefault();
  const popup = e.target.closest(".popup");
  const mestoToPush = { name: placeTitleInput.value, link: placeLinkInput.value };
  addCardToDOM(createCard(mestoToPush));

  closePopup(popup);
  clearForm(popup);
};

init();
