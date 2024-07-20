export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, id }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatarSelector);
    this._userId = id;
  }

  // Devuelve un objeto con los datos del usuario
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this.avatar.src,
      _id: this._userId,
    };
  }

  // Establece los datos del usuario
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this.avatar.src = data.avatar;
    this._userId = data._id;
  }
}
