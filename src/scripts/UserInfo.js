/**
 *
 *
 * @export
 * @class UserInfo
 */
export default class UserInfo {
  constructor({ elementWithName, elementWithInfo, elementWithAvatar }, id) {
    this._elementWithName = document.querySelector(elementWithName);
    this._elementWithInfo = document.querySelector(elementWithInfo);
    this._elementWithAvatar = document.querySelector(elementWithAvatar);
    this._userId = id;
  }

  getUserInfo() {
    return {
      name: this._elementWithName.textContent,
      info: this._elementWithInfo.textContent,
    };
  }

  getUserId() {
    return this._userId;
  }

  updateUserAvatar(link) {
    this._elementWithAvatar.style.backgroundImage = `url(${link})`;
  }

  updateUserData(name, info) {
    this._elementWithName.textContent = name;
    this._elementWithInfo.textContent = info;
  }

  setUserInfo(name, info, url, id) {
    this.updateUserData(name, info);
    this.updateUserAvatar(url);
    this._userId = id;
  }
}
