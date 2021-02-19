import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(".button_type_save");
  }

  open(card, delCallback) {
    super.open();
    this._card = card;
    this._delCallback = delCallback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._card.delete(this._delCallback(this._card._id).then(this.close()));
    });
  }
}
