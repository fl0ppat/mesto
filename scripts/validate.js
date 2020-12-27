const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_type_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error'
};

const showError = (formElement, inputElement, errorMesage, config) => {
    const errorElement = formElement.querySelector(`.${config.errorClass}_${inputElement.id}`);

    errorElement.classList.add(`${config.errorClass}_visible`);
    inputElement.classList.add(config.inputErrorClass);

    errorElement.textContent = errorMesage;
}

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${config.errorClass}_${inputElement.id}`);
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    errorElement.classList.remove(`${config.errorClass}_visible`);
    inputElement.classList.remove(config.inputErrorClass);

    submitButton.classList.remove(config.inactiveButtonClass);

    errorElement.textContent = '';
}

const enableButton = (formElement, config) => {
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    submitButton.classList.remove(config.inactiveButtonClass);
}

const disableButton = (formElement, config) => {
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    submitButton.classList.add(config.inactiveButtonClass);
}

function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
        hideError(formElement, inputElement, config);
    }

    if (formElement.checkValidity()) {
        enableButton(formElement, config);
    } else {
        disableButton(formElement, config);
    }
}

function setEventListener(formElement, config) {
    const inputArr = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputArr.map((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
        })
    })
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.map((formElement) => {
        setEventListener(formElement, config);
    })
}

enableValidation(validationConfig);