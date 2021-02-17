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

  setUserInfo(name, info, url, id) {
    this._elementWithName.textContent = name;
    this._elementWithInfo.textContent = info;
    this._elementWithAvatar.src = url;
    this._userId = id;
  }
}
