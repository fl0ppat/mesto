const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.button_type_add');

/** Popups */
const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupFull = document.querySelector('#full');

/** Popups Close Buttons */
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupFullCloseButton = popupFull.querySelector('.popup__close');

const showName = document.querySelector('.profile__name');
const showSubtitle = document.querySelector('.profile__subtitle');

/** Edit profile form */
const formEditUserProfile = document.querySelector('#formEdit');
const nameInput = formEditUserProfile.querySelector('input[name="name"]');
const subtitleInput = formEditUserProfile.querySelector('input[name="subtitle"]');

/** Add mesto form */
const formAddCard = document.querySelector('#formAdd');
const placeTitleInput = formAddCard.querySelector('input[name="title"]');
const placeLinkInput = formAddCard.querySelector('input[name="image"]');

const grid = document.querySelector('.grid-cards');
const mestoTemplateContent = document.querySelector('#mesto').content;

const init = () => {
  editButton.addEventListener('click', () => createPopup('edit'));
  addButton.addEventListener('click', () => createPopup('add'));
  formEditUserProfile.addEventListener('submit', submitEditForm);
  formAddCard.addEventListener('submit', submitAddForm);

  [popupEditCloseButton, popupAddCloseButton, popupFullCloseButton].forEach(button => {
    button.addEventListener('click', (e) => closePopup(e))
  });

  // eslint-disable-next-line no-undef
  cards.forEach((elem) => {
    addMesto(elem);
  });
}

const addMesto = (mesto) => {
  const newMesto = mestoTemplateContent.cloneNode(true);
  const newMestoImg = newMesto.querySelector('.grid-cards__img');
  newMestoImg.src = mesto.link;
  newMestoImg.alt = mesto.name;
  newMestoImg.addEventListener('click', (e) => {
    popupFull.querySelector('.popup__img').src = e.target.currentSrc;
    popupFull.querySelector('.popup__img').alt = e.target.alt;
    popupFull.querySelector('.popup__full-title').textContent = e.target.alt;
    createPopup('image');
  })
  newMesto.querySelector('.grid-cards__title').textContent = mesto.name;
  newMesto.querySelector('.grid-cards__like').addEventListener('click', (e) => {
    e.target.classList.toggle('grid-cards__like_liked');
  });
  newMesto.querySelector('.grid-cards__delete').addEventListener('click', (e) => {
    // eslint-disable-next-line no-undef
    cards.splice(cards.findIndex(mesto => mesto.name === e.target.offsetParent.querySelector('.grid-cards__title').innerText), 1)
    e.target.offsetParent.remove();
  })

  grid.prepend(newMesto);
}

const createPopup = (type) => {
  switch (type) {
    case 'edit':
      popupEdit.classList.add('popup_opened');
      nameInput.value = showName.textContent;
      subtitleInput.value = showSubtitle.textContent;
      break;

    case 'add':
      popupAdd.classList.add('popup_opened');
      break;

    case 'image':
      popupFull.classList.add('popup_opened');
      break;
  }
}

const closePopup = (elem) => {
  const parentElem = elem.target.closest('.popup');
  if (parentElem.classList.contains('popup_opened')) {
    parentElem.classList.toggle('popup_opened');
  }
}

const saveProfileData = (name, subtitle) => {
  showName.textContent = name;
  showSubtitle.textContent = subtitle;
}

const submitEditForm = (e) => {
  e.preventDefault();
  if (nameInput && subtitleInput) {
    saveProfileData(nameInput.value, subtitleInput.value);
  }
  closePopup(e);
}

const submitAddForm = (e) => {
  e.preventDefault();
  const mestoToPush = { 'name': placeTitleInput.value, 'link': placeLinkInput.value };
  addMesto(mestoToPush);
  closePopup(e);
}

init();