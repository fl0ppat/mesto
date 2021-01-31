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
    this._cardLikeButton.addEventListener("click", this._like);
    this._cardDeleteButton.addEventListener("click", (e) => {
      this._delete(e);
    });
    this._cardImage.addEventListener("click", () => {
      this._callback(this._imageUrl, this._name);
    });
  }

  _like() {
    this.classList.toggle("grid-cards__like_liked");
  }

  _delete(e) {
    e.target.offsetParent.remove();
  }

  /**
   * Create HTML-ready card statement
   *
   * @return {object}
   * @memberof Card
   */
  createCard() {
    const card = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._cardImage = card.querySelector(".grid-cards__img");
    this._cardTitle = card.querySelector(".grid-cards__title");
    this._cardLikeButton = card.querySelector(".grid-cards__like");
    this._cardDeleteButton = card.querySelector(".grid-cards__delete");

    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setCardEventListeners();
    return card;
  }
}
