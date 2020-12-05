const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.button_type_add');

const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupFull = document.querySelector('#full');

const formAdd = document.querySelector('#formAdd');

const showName = document.querySelector('.profile__name');
const showSubtitle = document.querySelector('.profile__subtitle');

const formEdit = document.querySelector('#formEdit');
let nameInput = formEdit.querySelectorAll('.popup__input')[0];
let subtitleInput = formEdit.querySelectorAll('.popup__input')[1];

const grid = document.querySelector('.grid-cards');
const footer = document.querySelector('.footer');

const mestoTemplate = document.querySelector('#mesto');
const mestoTemplateContent = document.querySelector('#mesto').content;

const cards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const init = () => {
  editButton.addEventListener('click', () => createPopup('edit'));
  addButton.addEventListener('click', () => createPopup('add'));
  formEdit.addEventListener('submit', submitHandler);

  closeButtons.forEach(button => { button.addEventListener('click', () => closePopup(button)) });

  cards.forEach((elem, index) => {
    addMesto(elem, index);
  });

  formAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    let mestoToPush = { 'name': e.target.elements[1].value, 'link': e.target.elements[2].value };
    cards.push(mestoToPush);
    addMesto(mestoToPush);
    closePopup();
  });
}

const addMesto = (mesto, index) => {
  const newMesto = mestoTemplateContent.cloneNode(true);
  const newMestoImg = newMesto.querySelector('.grid-cards__img');
  newMestoImg.src = mesto.link;
  newMestoImg.alt = mesto.name;
  newMestoImg.addEventListener('click', (e) => {
    popupFull.querySelector('.popup__img').src = e.target.currentSrc;
    popupFull.querySelector('.popup__full-title').textContent = e.target.alt;
    createPopup('full');
  })
  newMesto.querySelector('.grid-cards__title').textContent = mesto.name;
  newMesto.querySelector('.grid-cards__like').addEventListener('click', (e) => {
    e.target.classList.toggle('grid-cards__like_liked');
  });
  newMesto.querySelector('.grid-cards__delete').addEventListener('click', (e) => {
    console.dir(e.target.offsetParent.querySelector('.grid-cards__title').innerText);
    cards.splice(cards.findIndex(mesto => mesto.name === e.target.offsetParent.querySelector('.grid-cards__title').innerText), 1)

    e.target.offsetParent.remove();
  })

  grid.append(newMesto);
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

    case 'full':
      popupFull.classList.add('popup_opened');
      break;
  }
}


const closePopup = () => {
  if (document.querySelector('.popup_opened').classList.contains('popup_opened')) {
    document.querySelector('.popup_opened').classList.toggle('popup_opened');
  }
}

const saveData = (name, subtitle) => {
  showName.textContent = name;
  showSubtitle.textContent = subtitle;
  closePopup();

}

const submitHandler = (e) => {
  e.preventDefault();
  if (nameInput && subtitleInput) {
    saveData(nameInput.value, subtitleInput.value);
  }
}


init();