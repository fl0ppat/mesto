export default class Card {
  constructor(imageUrl, name, templateSelector) {
    this._imageUrl = imageUrl;
    this._name = name;
    this._templateSelector = templateSelector;
    this._isLiked = false;
  }

  _setCardEventListeners() {
    this._cardLikeButton.addEventListener("click", this._like);
    this._cardDeleteButton.addEventListener("click", (e) => {
      this._delete(e);
    });
    this._cardImage.addEventListener("click", (e) => {
      popupFullImg.src = this._imageUrl;
      popupFullImg.alt, (popupFull.querySelector(".popup__full-title").textContent = this._name);
      createPopup("image");
    });
  }

  _like() {
    this._isLiked = !this._isLiked;
    this.classList.toggle("grid-cards__like_liked");
  }

  _delete(e) {
    console.log(this);
    console.log(e.target.offsetParent);
    e.target.offsetParent.remove();
  }

  _createCardFromTemplate() {
    const card = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._cardImage = card.querySelector(".grid-cards__img");
    this._cardTitle = card.querySelector(".grid-cards__title");
    this._cardLikeButton = card.querySelector(".grid-cards__like");
    this._cardDeleteButton = card.querySelector(".grid-cards__delete");

    this._cardImage.src = this._imageUrl;
    this._cardTitle.textContent = this._name;

    this._setCardEventListeners();
    return card;
  }

  prepareCardToPrepend() {
    return this._createCardFromTemplate();
  }
}
