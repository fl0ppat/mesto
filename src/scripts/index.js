import "../pages/index.css";

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
  formAddCardValidate.buttonActivityHandler(true);
  popupEdit.open();
});

document.querySelector(addCardButtonSelector).addEventListener("click", () => {
  formAddCardValidate.buttonActivityHandler(false);
  popupAdd.open();
});

formEditUserProfileValidate.enableValidation(formEditUserProfile);
formAddCardValidate.enableValidation(formAddCard);

/* Callbacks */
const openFullImageCallback = (link, name) => popupFullImage.open(link, name);
const updateUserInfoCallback = ({ name, subtitle }) => {
  userInfo.setUserInfo(name, subtitle);
};
const submitToAddCardCallback = (item) => {
  section.addItem(item);
};

const renderer = (item) => {
  const card = new Card(item.link, item.name, cardTemplateSelector, openFullImageCallback.bind(item.link, item.name));
  return card.createCard();
};

/* Section */
const section = new Section({ cards, renderer }, ".grid-cards");
section.renderAllItems();

/* Popups */
const popupEdit = new PopupWithForm("#edit", updateUserInfoCallback, formEditUserProfileValidate);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm("#add", submitToAddCardCallback, formAddCardValidate);
popupAdd.setEventListeners();

const popupFullImage = new PopupWithImage("#full");
popupFullImage.setEventListeners();
