import Popup from "./Popup.js";
/**
 *
 *
 * @export
 * @class PopupWithForm
 * @extends {Popup}
 */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, validator) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(`.popup__form`);
    this._submitButton = this._formElement.querySelector(`button[type="submit"]`);
    this._submitCallback = submitCallback;
    this._validator = validator;
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._formElement).entries());
  }

  /**
   * Change text in button
   *
   * @param {string} message
   */
  handleProcessing(message) {
    this._submitButton.textContent = message;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._formElement.reset();
    this._validator.handleClearInputs(this._formElement);
    super.close();
  }
}
