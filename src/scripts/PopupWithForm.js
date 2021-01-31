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
    this._submitCallback = submitCallback;
    this._validator = validator;
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._formElement).entries());
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  open() {
    //this._validator.clearInputHandler(this._formElement);
    super.open();
  }

  close() {
    this._formElement.reset();
    this._validator.clearInputHandler(this._formElement);
    super.close();
  }
}
