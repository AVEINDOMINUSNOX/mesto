export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }


  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }




  //Пользователь
  //Получаем инф-ию о пользователе
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
      method: 'GET',
    }).then(this._handleResponse)
  }

  // Cохраняем данные пользователя
  saveUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._handleResponse)
  }

  // Сохраняем Аватар
  saveAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._handleResponse)
  }



  //Фотокарточки
  // Получаем список фотокарточек
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: 'GET'
    })
      .then(this._handleResponse)
  }

  postCard(data) {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      headers: this.headers,
      method: 'DELETE'
    })
      .then(this._handleResponse)
  }

  setLikeCard(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'PUT'
    })
      .then(this._handleResponse)
  }

  deleteLikeCard(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'DELETE'
    })
      .then(this._handleResponse)
  }
}
