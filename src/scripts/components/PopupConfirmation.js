import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__input-container');
    this._handleSubmit = undefined;
  }

  open({ handleSubmit }) {
    super.open();
    this._handleSubmit = handleSubmit;
  }

  close() {
    super.close();
    this._handleSubmit = undefined;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

    });
  }
}



