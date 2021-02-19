import { ESC } from "./constants.js";
/**
 * Popup object. Used for DOM manipulation.
 *
 * @export
 * @class Popup
 */
export default class Popup {
  /**
   * Creates an instance of Popup.
   * @param {string} popupSelector Search selector in DOM
   * @memberof Popup
   */
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._isOpen = false;
  }

  /**
   * Make bound HTML-instance visible
   *
   * @memberof Popup
   */
  open() {
    this._isOpen = !this._isOpen;
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /**
   * Make bound HTML-instance invisible
   *
   * @memberof Popup
   */
  close() {
    if (this._isOpen) {
      this._isOpen = !this._isOpen;
      this._popupElement.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(event) {
    if (event.key === ESC) {
      this.close();
    }
  }

  _handleCloseByClickOnEmptySpace(event) {
    if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      this._handleCloseByClickOnEmptySpace(e);
    });
  }
}
