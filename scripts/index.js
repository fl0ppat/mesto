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

const popupFullImg = popupFull.querySelector('.popup__img');

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

    // eslint-disable-next-line no-undef
    cards.forEach((elem) => {
        addCardToDOM(elem);
    });
}

const createCard = (elem) => {
    const name = elem.name;
    const link = elem.link;
    const newCard = mestoTemplateContent.cloneNode(true);
    const newCardImage = newCard.querySelector('.grid-cards__img');

    newCardImage.src = link;
    newCardImage.alt = name;
    newCard.querySelector('.grid-cards__title').textContent = name;

    newCard.querySelector('.grid-cards__img').addEventListener('click', (e) => {
        popupFullImg.src = e.target.currentSrc;
        popupFullImg.alt = e.target.alt;
        popupFull.querySelector('.popup__full-title').textContent = e.target.alt;
        createPopup('image');
    })
    newCard.querySelector('.grid-cards__like').addEventListener('click', (e) => {
        e.target.classList.toggle('grid-cards__like_liked');
    });
    newCard.querySelector('.grid-cards__delete').addEventListener('click', (e) => {
        // eslint-disable-next-line no-undef
        cards.splice(cards.findIndex(mesto => mesto.name === e.target.offsetParent.querySelector('.grid-cards__title').innerText), 1)
        e.target.offsetParent.remove();
    })

    return newCard;
}

const addCardToDOM = (elem) => {
    grid.prepend(createCard(elem));
}


const createPopup = (type) => {
    switch (type) {
        case 'edit':
            clearForm(popupEdit);
            clearInputHandler(popupEdit)
            nameInput.value = showName.textContent;
            subtitleInput.value = showSubtitle.textContent;
            popupEdit.classList.add('popup_opened');
            addCloseListeners(popupEdit);
            break;

        case 'add':
            clearInputHandler(popupAdd);
            clearForm(popupAdd);
            popupAdd.classList.add('popup_opened');
            addCloseListeners(popupAdd);
            break;

        case 'image':
            popupFull.classList.add('popup_opened');
            addCloseListeners(popupFull);
            break;
    }

}

const getOpenedPopup = () => {
    return document.querySelector('.popup_opened');
}

const closePopupByButton = (e) => {
    if (e.key === 'Escape') {
        const popup = getOpenedPopup();
        closePopup(popup);
    };
}

const closePopupByClick = (e) => {
    const popup = getOpenedPopup();
    if (e.target.classList.contains('popup_opened') ||
        e.target.classList.contains('popup__close')) {
        closePopup(popup);
    }
}

const addCloseListeners = (popup) => {
    document.addEventListener('keydown', closePopupByButton);
    popup.addEventListener('click', closePopupByClick)
}

function clearListener(elem, event, callback) {
    elem.removeEventListener(event, callback, false);
}

function closePopup(popup) {
    clearListener(popup, 'click', closePopupByClick);
    clearListener(document, 'keydown', closePopupByButton);

    popup.classList.remove('popup_opened');
}

function clearForm(popup) {
    const popupForm = popup.querySelector(validationConfig.formSelector);

    popupForm.reset();
}

function clearInputHandler(popup) {
    const popupForm = popup.querySelector(validationConfig.formSelector);

    popupForm.querySelectorAll(`.${validationConfig.errorClass}_visible`).forEach((elem) => {
        console.log(`.${validationConfig.errorClass}_visible`);
        elem.classList.remove(`${validationConfig.errorClass}_visible`);
        console.log(elem);
    })
    popupForm.querySelectorAll(`.${validationConfig.inputErrorClass}`).forEach((elem) => {
        console.log(elem);
        elem.classList.remove(`${validationConfig.inputErrorClass}`);
        console.log(elem);
    })
}

const saveProfileData = (name, subtitle) => {
    showName.textContent = name;
    showSubtitle.textContent = subtitle;
}

const submitEditForm = (e) => {
    e.preventDefault();
    const popup = e.target.closest('.popup');
    if (nameInput && subtitleInput) {
        saveProfileData(nameInput.value, subtitleInput.value);
    }

    closePopup(popup);
    clearForm(popup);
}

const submitAddForm = (e) => {
    e.preventDefault();
    const popup = e.target.closest('.popup');
    const mestoToPush = { 'name': placeTitleInput.value, 'link': placeLinkInput.value };
    addCardToDOM(mestoToPush);

    closePopup(popup);
    clearForm(popup);
}

init();