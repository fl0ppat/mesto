const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_type_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

const showError = (formElement, inputElement, errorMesage) => {
  console.dir(`Show message '${errorMesage}' for ${inputElement} for ${formElement}`);
  const errorElement = formElement.querySelector(`.${validationConfig.errorClass}_${inputElement.id}`);

  errorElement.classList.add(`${validationConfig.errorClass}_visible`);
  inputElement.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMesage;
  
}

const hideError = (formElement, inputElement) => {
  console.dir(`Hide message for ${inputElement} for ${formElement}`);
  
  const errorElement = formElement.querySelector(`.${validationConfig.errorClass}_${inputElement.id}`);
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  errorElement.classList.remove(`${validationConfig.errorClass}_visible`);
  inputElement.classList.remove(validationConfig.inputErrorClass);

  submitButton.classList.remove(validationConfig.inactiveButtonClass);

  errorElement.textContent = '';
}

const enableButton = (formElement) => {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.remove(validationConfig.inactiveButtonClass);
}

const disableButton = (formElement) => {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement);
  }

  if(formElement.checkValidity()) {
    enableButton(formElement);
  } else {
    disableButton(formElement);
  }
}

function clearForm(formElement) {

}

function setEventListener(formElement, inputSelector) {
  const inputArr = Array.from(formElement.querySelectorAll(inputSelector));
  inputArr.map((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.map((formElement) => {
    setEventListener(formElement, validationConfig.inputSelector);
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      setEventListener(formElement);
    })
  })
}

Array.from(document.querySelectorAll(`.popup__form`)).map(() => {enableValidation(validationConfig)});

