import Popup from "./Popup.js";
import { inputValues } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._formSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__input-container');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector(".popup__save-button");
  }

  loading(text) {
    this._saveButton.textContent = text;
  }


  //Собираем данные инпутов
  _getInputValues() {
    // Добавляем в пустой объект inputValues значения инпутов
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  //Слушатели событий
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}
