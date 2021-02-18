export default class Api {
  constructor(data) {
    this._token = data.token;
    this._id = data.id;
    this.deleteCard = this.deleteCard.bind(this);
  }

  getInitialCards() {
    return this._sendRequest("GET", `https://mesto.nomoreparties.co/v1/${this._id}/cards`).then((res) =>
      this._handleResponseStatus(res)
    );
  }

  getUserData() {
    return this._sendRequest("GET", `https://mesto.nomoreparties.co/v1/${this._id}/users/me`).then((res) =>
      this._handleResponseStatus(res)
    );
  }

  editProfileData(name, about) {
    return this._sendRequest(
      "PATCH",
      `https://mesto.nomoreparties.co/v1/${this._id}/users/me`,
      { "Content-Type": "application/json" },
      { name: name, about: about }
    ).then((res) => this._handleResponseStatus(res));
  }

  addNewCard(name, link) {
    return this._sendRequest(
      "POST",
      `https://mesto.nomoreparties.co/v1/${this._id}/cards`,
      { "Content-Type": "application/json" },
      { name: name, link, link }
    ).then((res) => this._handleResponseStatus(res));
  }

  deleteCard(id) {
    return this._sendRequest("DELETE", `https://mesto.nomoreparties.co/v1/${this._id}/cards/${id}`).then((res) =>
      this._handleResponseStatus(res)
    );
  }

  sendLike(id) {
    return this._sendRequest("PUT", `https://mesto.nomoreparties.co/v1/${this._id}/cards/likes/${id}`).then((res) =>
      this._handleResponseStatus(res)
    );
  }

  delLike(id) {
    return this._sendRequest("DELETE", `https://mesto.nomoreparties.co/v1/${this._id}/cards/likes/${id}`).then((res) =>
      this._handleResponseStatus(res)
    );
  }

  updateAvatar(link) {
    console.log(link);
    return this._sendRequest(
      "PATCH", 
      `https://mesto.nomoreparties.co/v1/${this._id}/users/me/avatar`,
      { "Content-Type": "application/json" },
      { avatar: link }
    ).then((res) => {
      this._handleResponseStatus(res);
    });
  }

  _handleResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.error(`Ошибка: ${res.errors}`);

      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _objectIsEmptyOrUndefined(obj) {
    if (obj === "undefined") {
      return true;
    } else {
      return obj && Object.keys(obj).length === 0;
    }
  }

  /**
   * Send modulable request
   *
   * @param {string} method Sending method (GET, POST, etc.)
   * @param {string} url API URL
   * @param {object} headers key: value representation of headers
   * @param {object} body key: vlaue representation of body
   * @return {Promise}
   * @memberof Api
   */
  _sendRequest(method, url, headers, body) {
    const reqHeader = {
      authorization: this._token,
    };

    if (headers && !this._objectIsEmptyOrUndefined(headers)) {
      Object.assign(reqHeader, headers);
    }

    const fetchData = {
      method: method,
      headers: reqHeader,
    };

    if (body && !this._objectIsEmptyOrUndefined(body)) {
      fetchData.body = JSON.stringify(body);
    }
    return fetch(url, fetchData);
  }
}
