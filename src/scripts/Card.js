/**
 * Class Card
 */
export default class Card {
  /**
   * Creates an instance of Card.
   * @param {string} imageUrl          Link for image in WEB
   * @param {string} name              Title for Card
   * @param {object} templateSelector  HTML Selector for querySelector
   * @param {object} callback          Callback for One of event listeners
   * @memberof Card
   */
  constructor(imageUrl, name, templateSelector, callback) {
    this._imageUrl = imageUrl;
    this._name = name;
    this._templateSelector = templateSelector;
    this._isLiked = false;
    this._callback = callback;
  }

  _setCardEventListeners() {
    this._cardLikeButton.addEventListener("click", (e) => {
      this._like(e);
    });
    this._cardDeleteButton.addEventListener("click", () => this._delete());
    this._cardImage.addEventListener("click", () => {
      this._callback(this._imageUrl, this._name);
    });
  }

  _like(e) {
    e.target.classList.toggle("grid-cards__like_liked");
  }

  _delete() {
    this._card.remove();
  }

  /**
   * Create HTML-ready card statement
   *
   * @return {object}
   * @memberof Card
   */
  createCard() {
    this._card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".grid-cards__card")
      .cloneNode(true);
    this._cardImage = this._card.querySelector(".grid-cards__img");
    this._cardTitle = this._card.querySelector(".grid-cards__title");
    this._cardLikeButton = this._card.querySelector(".grid-cards__like");
    this._cardDeleteButton = this._card.querySelector(".grid-cards__delete");

    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setCardEventListeners();
    return this._card;
  }
}
