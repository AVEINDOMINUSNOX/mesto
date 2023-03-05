import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._formSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__input-container');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  renderLoading(text) {
    this._form.querySelector(".popup__save-button").textContent = text;
  }


//Собираем данные инпутов
  _getInputValues() {
// Создаем пустой объект
    this._inputValues = {};
// Добавляем в него знаения инпутов
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
//Слушатели событий
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}
