 class Api {
  constructor({headers, baseUrl}) {
    this._headers = headers
    this._baseUrl = baseUrl
  }
    _handleResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      };
  

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, { 
      method: "GET",
    headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  changeProfile({name, about}) {
   return fetch(this._baseUrl + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      } ), 
    }) 
    .then(this._handleResponse);
  }

  addCard(data) {
   return fetch(this._baseUrl + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  setLike(_id) {
    return fetch(this._baseUrl + `/cards/` + _id + `/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }
   // Удалить лайк
   removeLike(_id) {
    return fetch(this._baseUrl + `/cards/` + _id + `/likes/`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  changeAvatar({data}) {
    return  fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify( {avatar: data} )
    })
      .then(this._handleResponse);
  }

  deleteCard(_cardId) {
    return fetch(this._baseUrl + `/cards/` + _cardId, {
        method: "DELETE",
        headers: this._headers,
    }).then(this._handleResponse);
  
  }
  
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-54`,
  headers: {
    authorization: "234760c4-c169-4c5e-95d9-4ebca7efc3f0",
    "Content-Type": "application/json",
  },
});
