export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._avatar.alt = "Аватар пользователя"
  }

  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      id: this._id
    };

    return profileInfo;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserId(id) {
    this._id = id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

}
