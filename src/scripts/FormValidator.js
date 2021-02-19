export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  /**
   * Set input validation for input HTML elements
   *
   * @param {object} inputElement HTML input element
   * @memberof FormValidator
   */
  _setValidation(inputElement) {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(this._formElement, inputElement);
    });
  }

  /**
   * Change CSS-style of form submit button.
   * If true - make button active, else - disable button
   *
   * @param {boolean} state
   * @memberof FormValidator
   */
  handleButtonActivity(state) {
    if (state) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled", "disabled");
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "disabled");
    }
  }

  /**
   * Change visibility and content of error messages.
   * If true - show error, else - hide error
   *
   * @param {boolean} state
   * @param {object} inputElement
   * @param {string} errorMessage
   * @memberof FormValidator
   */
  _handleErrorVisibility(state, inputElement) {
    const errorElement = this._formElement.querySelector(`.${this._config.errorClass}_${inputElement.id}`);
    if (state) {
      errorElement.classList.add(this._config.errorClassVisible);
      inputElement.classList.add(this._config.inputErrorClass);
    } else {
      const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);

      errorElement.classList.remove(this._config.errorClassVisible);
      inputElement.classList.remove(this._config.inputErrorClass);
      submitButton.classList.remove(this._config.inactiveButtonClass);
    }
    errorElement.textContent = inputElement.validationMessage;

    this.handleButtonActivity(state);
  }

  /**
   * Event listener callback. Check inputs for validity
   *
   * @param {object} formElement
   * @param {object} inputElement
   * @memberof FormValidator
   */
  _checkInputValidity(formElement, inputElement) {
    this._handleErrorVisibility(!inputElement.validity.valid, inputElement);
    this.handleButtonActivity(formElement.checkValidity());
  }

  /**
   * Enable custom HTML form validation
   *
   * @param {object} formElement
   * @memberof FormValidator
   */
  enableValidation() {
    const arrayOfInputs = this._formElement.querySelectorAll(this._config.inputSelector);
    arrayOfInputs.forEach((input) => {
      this._setValidation(input);
    });
  }

  handleClearInputs(formElement) {
    formElement.querySelectorAll(`.${this._config.errorClass}_visible`).forEach((elem) => {
      elem.classList.remove(`${this._config.errorClass}_visible`);
    });
    formElement.querySelectorAll(`.${this._config.inputErrorClass}`).forEach((elem) => {
      elem.classList.remove(`${this._config.inputErrorClass}`);
    });
  }
}
