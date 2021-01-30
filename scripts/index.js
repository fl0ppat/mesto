import {
  profileEditButtonSelector,
  addCardButtonSelector,
  validationConfig,
  formEditUserProfileSelector,
  formAddCardSelector,
  cardTemplateSelector,
} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cards } from "./initial-cards.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const userInfo = new UserInfo({ elementWithName: ".profile__name", elementWithInfo: ".profile__subtitle" });

const formEditUserProfile = document.querySelector(formEditUserProfileSelector);
const formEditUserProfileInputs = formEditUserProfile.querySelectorAll("input");

const formAddCard = document.querySelector(formAddCardSelector);

const formEditUserProfileValidate = new FormValidator(validationConfig, formEditUserProfile);
const formAddCardValidate = new FormValidator(validationConfig, formAddCard);

document.querySelector(profileEditButtonSelector).addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  formEditUserProfileInputs[0].value = info.name;
  formEditUserProfileInputs[1].value = info.info;
  popupEdit.open();
});

document.querySelector(addCardButtonSelector).addEventListener("click", () => {
  formAddCardValidate.buttonActivityHandler(false);
  popupAdd.open();
});

formEditUserProfileValidate.enableValidation(formEditUserProfile);
formAddCardValidate.enableValidation(formAddCard);

const renderer = (item) => {
  const card = new Card(item.link, item.name, cardTemplateSelector, openFullImageCallback.bind(item.link, item.name));
  return card.createCard();
};

/* Callbacks */
const openFullImageCallback = (link, name) => popupFullImage.open(link, name);
const updateUserInfoCallback = ({ name, subtitle }) => {
  userInfo.setUserInfo(name, subtitle);
};
const submitToAddCardCallback = (item) => {
  section.addItem(item);
};

const section = new Section({ cards, renderer }, ".grid-cards");
section.renderAllItems();

/* Popups */
const popupEdit = new PopupWithForm("#edit", updateUserInfoCallback, formEditUserProfileValidate);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm("#add", submitToAddCardCallback, formAddCardValidate);
popupAdd.setEventListeners();

const popupFullImage = new PopupWithImage("#full");
popupFullImage.setEventListeners();

/*const callbackForCard = (imageURL, name) => {
  popupFullImg.src = imageURL;
  popupFullImg.alt = name;
  popupFull.querySelector(".popup__full-title").textContent = name;
  openPopup(popupFull);
};

function openAuthorForm() {
  formEditUserProfileValidate.clearInputHandler(popupEdit);
  nameInput.value = showName.textContent;
  subtitleInput.value = showSubtitle.textContent;
  //popupEdit.open();
  //popupEdit.querySelector(validationConfig.submitButtonSelector).classList.remove(validationConfig.inactiveButtonClass);
}

function openAddCardForm() {
  formAddCardValidate.clearInputHandler(popupAdd);
  popupAdd.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
  clearForm(popupAdd);
  openPopup(popupAdd);
}

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
};*/
