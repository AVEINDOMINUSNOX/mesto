import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__input-container');
    this._buttonConfirm = this._form.querySelector(".popup__save-button");
    this.handleSubmit = undefined;
  }

  open({ handleSubmit }) {
    super.open();
    this.handleSubmit = handleSubmit;
  }

  close() {
    super.close();
    this.handleSubmit = undefined;
  }

  loading(text) {
    this._buttonConfirm.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();

    });
  }
}



