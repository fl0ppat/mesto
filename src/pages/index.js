import "../pages/index.css";

import {
  profileEditButtonSelector,
  addCardButtonSelector,
  validationConfig,
  formEditUserProfileSelector,
  formAddCardSelector,
  cardTemplateSelector,
  apiAuthData,
  loaderSelector,
  formUpdateAvatarSelector,
  avatarSelector,
  skeletonSelector,
} from "../scripts/constants.js";
import Api from "../scripts/Api.js";
import initialCards from "../scripts/initial-cards.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

const loader = document.querySelector(loaderSelector);
const skeletonElements = document.querySelectorAll("." + skeletonSelector);

const Api = new Api(apiAuthData);
const userInfo = new UserInfo(
  {
    elementWithName: ".profile__name",
    elementWithInfo: ".profile__subtitle",
    elementWithAvatar: ".profile__avatar",
  },
  "0"
);

Api.getUserData().then((res) => {
  skeletonElements.forEach((element) => {
    element.classList.remove(skeletonSelector);
  });
  userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
});

const avatarElement = document.querySelector(avatarSelector);
const formEditUserProfile = document.querySelector(formEditUserProfileSelector);
const formUpdateAvatar = document.querySelector(formUpdateAvatarSelector);
const formAddCard = document.querySelector(formAddCardSelector);
const formEditUserProfileInputs = {
  name: formEditUserProfile.querySelector("#name-input"),
  info: formEditUserProfile.querySelector("#subtitle-input"),
};

const formEditUserProfileValidate = new FormValidator(validationConfig, formEditUserProfile);
const formAddCardValidate = new FormValidator(validationConfig, formAddCard);
const formUpdateAvatarValidate = new FormValidator(validationConfig, formUpdateAvatar);

document.querySelector(profileEditButtonSelector).addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  formEditUserProfileInputs.name.value = info.name;
  formEditUserProfileInputs.info.value = info.info;
  formEditUserProfileValidate.handleButtonActivity(true);
  popupEdit.open();
});

document.querySelector(addCardButtonSelector).addEventListener("click", () => {
  formAddCardValidate.handleButtonActivity(false);
  popupAdd.open();
});

avatarElement.addEventListener("click", () => {
  formUpdateAvatarValidate.handleButtonActivity(false);
  popupUpdateAvatar.open();
});

formEditUserProfileValidate.enableValidation(formEditUserProfile);
formAddCardValidate.enableValidation(formAddCard);
formUpdateAvatarValidate.enableValidation(formUpdateAvatar);

/* Callbacks */
const openFullImageCallback = (link, name) => popupFullImage.open(link, name);
const updateUserInfoCallback = ({ name, subtitle }) => {
  popupEdit.handleProcessing("Обновляю...");
  Api.editProfileData(name, subtitle)
    .then(userInfo.setUserInfo(name, subtitle))
    .then(popupEdit.handleProcessing("Сохранить"));
};

const submitToUpdateAvatarCallback = (link) => {
  popupUpdateAvatar.handleProcessing("Обновляю...");
  formUpdateAvatarValidate.handleButtonActivity(false);
  Api.updateAvatar(link.link)
    .then(userInfo.updateUserAvatar(link.link))
    .then(popupUpdateAvatar.handleProcessing("Сохранить"));
};

const submitToAddCardCallback = (item) => {
  popupAdd.handleProcessing("Добавляю...");
  Api.addNewCard(item.name, item.link)
    .then((res) => {
      section.addItem(res);
    })
    .then(popupAdd.handleProcessing("Сохранить"));
};

const deleteCardCallback = (card) => {
  popupConfirmDeleteCard.open(card, Api.deleteCard);
};

const handeLikeCard = (status, id) => {
  if (status) {
    return Api.sendLike(id);
  } else {
    return Api.delLike(id);
  }
};

const renderer = (item) => {
  const isLiked = item.likes.some((like) => {
    return like._id === userInfo.getUserId();
  });
  const card = new Card(
    item.link,
    item.name,
    cardTemplateSelector,
    openFullImageCallback.bind(item.link, item.name),
    deleteCardCallback,
    handeLikeCard,
    item.likes,
    item._id,
    item.owner._id,
    item.owner._id == userInfo.getUserId(),
    isLiked
  );
  return card.createCard();
};

const section = new Section([], renderer, ".grid-cards");

/* Section */
function loadAllCards() {
  Api.getInitialCards()
    .then((res) => {
      loader.style.display = "none";
      res.reverse().forEach((card) => {
        section.addItem(card);
      });
    })
    .catch(() => {
      loader.style.display = "none";
      initialCards.forEach((card) => {
        section.addItem(card);
      });
    });
}

/* Popups */
const popupEdit = new PopupWithForm("#edit", updateUserInfoCallback, formEditUserProfileValidate);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm("#add", submitToAddCardCallback, formAddCardValidate);
popupAdd.setEventListeners();

const popupFullImage = new PopupWithImage("#full");
popupFullImage.setEventListeners();

const popupConfirmDeleteCard = new PopupWithConfirmation("#confirm");
popupConfirmDeleteCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm("#updateAvatar", submitToUpdateAvatarCallback, formUpdateAvatarValidate);
popupUpdateAvatar.setEventListeners();

loadAllCards();
