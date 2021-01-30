export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._isOpen = false;
  }

  open() {
    this._isOpen = !this._isOpen;
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (this._isOpen) {
      this._isOpen = !this._isOpen;
      this._popupElement.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    this.close();
  }

  _handleCloseByClickOnEmptySpace(event) {
    if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector(".popup__close").addEventListener("click", () => {
      this._handleCloseButtonClick();
    });

    this._popupElement.addEventListener("click", (e) => {
      this._handleCloseByClickOnEmptySpace(e);
    });
  }
}
