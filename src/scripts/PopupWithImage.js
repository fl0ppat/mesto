import Popup from "./Popup.js";
/**
 *
 *
 * @export
 * @class PopupWithImage
 * @extends {Popup}
 */
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__img");
    this._imageTitle = this._popupElement.querySelector(".popup__full-title");
  }

  _replaceData(url, title) {
    this._imageElement.src = url;
    this._imageElement.alt = title;
    this._imageTitle.textContent = title;
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageTitle.textContent = name;
    //add img
    super.open();
  }
}
