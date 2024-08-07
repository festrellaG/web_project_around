export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    // si el servidor devuelve un error, rechaza el promise
    return Promise.reject(`Error: ${res.status}`);
  }

  /* obtiene las cartas de la API */
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Obtiene la información del perfil de la API */
  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Modifica la información del perfil de la API */
  editProfile(profile) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.about,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Agrega cartas */
  addCards(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Elimina cartas */
  removeCards(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Agrega likes */
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Elimina likes */
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  /* Modifica el avatar */
  editProfileAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.url,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }
}
