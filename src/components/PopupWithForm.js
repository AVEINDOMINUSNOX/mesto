import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, formSubmit) {
    super(selectorPopup);

    this._formSubmit = formSubmit;
    this._form = this._selector.querySelector('.popup__input-container');
  }

//Собираем данные инпутов
  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__input');
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
