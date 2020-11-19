const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');

const popup = document.querySelector('.popup');

const form = document.querySelector('.popup__form');

const showName = document.querySelector('.profile__name');
const showSubtitle = document.querySelector('.profile__subtitle');
let nameInput = form.querySelectorAll('.popup__input')[0];
let subtitleInput = form.querySelectorAll('.popup__input')[1];


const init = () => {
  editButton.addEventListener('click', openPopup);
  closeButton.addEventListener('click', closePopup);
  form.addEventListener('submit', submitHandler);
}

const openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = showName.textContent;
  subtitleInput.value = showSubtitle.textContent;
}

const closePopup = () => {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
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


  //TODO Save to Cookies
}


init();