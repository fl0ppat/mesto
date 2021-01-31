/**
 *
 *
 * @export
 * @class Section
 */
export default class Section {
  constructor({ cards, renderer }, containerSelector) {
    this._listOfItems = cards;
    this._renderExpression = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Add DOM-element to container
   *
   * @param {object} element
   * @memberof Section
   */
  addItem(card) {
    this._container.prepend(this._renderExpression(card));
  }

  /**
   * Render all items statement
   *
   * @memberof Section
   */
  renderAllItems() {
    this._listOfItems.forEach((item) => {
      this.addItem(item);
    });
  }
}
