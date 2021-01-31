/**
 *
 *
 * @export
 * @class UserInfo
 */
export default class UserInfo {
  constructor({ elementWithName, elementWithInfo }) {
    this._elementWithName = document.querySelector(elementWithName);
    this._elementWithInfo = document.querySelector(elementWithInfo);
  }

  getUserInfo() {
    return {
      name: this._elementWithName.textContent,
      info: this._elementWithInfo.textContent,
    };
  }

  setUserInfo(name, info) {
    this._elementWithName.textContent = name;
    this._elementWithInfo.textContent = info;
  }
}
