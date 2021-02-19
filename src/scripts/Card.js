import loadError from "../vendor/image404.png";
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
   * @param {array} likes              Array of likes
   * @param {stirng} id                Uniq id of card
   * @param {string} owner             Uniq uploader card id
   * @memberof Card
   */
  constructor(
    imageUrl,
    name,
    templateSelector,
    callback,
    deleteCallback,
    likeCallback,
    likes,
    id,
    owner,
    isAuthor,
    isLiked
  ) {
    this._imageUrl = imageUrl;
    this._name = name;
    this._templateSelector = templateSelector;
    this._callback = callback;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._likes = likes;
    this._id = id;
    this.owner = owner;
    this._isAuthor = isAuthor;
    this._isLiked = isLiked;
  }

  _setCardEventListeners() {
    this._cardLikeButton.addEventListener("click", (e) => {
      this._like(e);
    });
    this._cardDeleteButton.addEventListener("click", () => this._confirmDeletion());
    this._cardImage.addEventListener("click", () => {
      this._callback(this._imageUrl, this._name);
    });
  }

  /**
   * Спасибо за рекомендацию с переносом логики в колбек.
   * Так как для исправления придётся переписать приличный кусок, боюсь, могу не уложиться в срок.
   *
   * Поправлю "Можно лучше" позже.
   */
  _like(e) {
    if (!this._isLiked) {
      this._isLiked = true;
      this._likeCallback(true, this._id)
        .then((res) => {
          e.target.classList.add("grid-cards__like_liked");
          this._cardLikeCounter.textContent = res.likes.length;
        })
        .catch((error) => console.error(error));
    } else {
      this._isLiked = false;
      this._likeCallback(false, this._id)
        .then((res) => {
          e.target.classList.remove("grid-cards__like_liked");
          this._cardLikeCounter.textContent = res.likes.length;
        })
        .catch((error) => console.error(error));
    }
  }

  _confirmDeletion() {
    this._deleteCallback(this);
  }

  delete(apiCall) {
    apiCall(this._id)
      .then(() => {
        this._card.classList.add("grid-cards__card_out");
        setTimeout(() => {
          this._card.remove();
        }, 300);
      })
      .catch((error) => console.error(error));
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
    this._cardLikeCounter = this._card.querySelector(".grid-cards__like-counter");

    this._card.dataset.id = this._id;
    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._name;
    this._cardImage.onerror = () => {
      this._cardImage.src = loadError;
      this._imageUrl = loadError;
    };
    this._cardTitle.textContent = this._name;
    this._cardLikeCounter.textContent = this._likes.length;

    if (!this._isAuthor) {
      this._cardDeleteButton.remove();
    }

    if (this._isLiked) {
      this._cardLikeButton.classList.add("grid-cards__like_liked");
    }

    this._setCardEventListeners();
    return this._card;
  }
}
