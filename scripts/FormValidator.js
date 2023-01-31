export default class FormValidator {

  constructor(config, formValidate) {
    this._formValidate = formValidate;
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(this._formValidate.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formValidate.querySelector(this._submitButtonSelector);
  }

  //Выводим ошибку
  _showInputError(inputElement) {
    const errorElement = this._formValidate.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  //Скрываем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formValidate.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  //Проверяем инпуты на св-во validity
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  //Проверяем валидность всех инпутов
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //изменение режимов кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //Находим список инпутов каждой формы и вешаем обработчики на события инпут
  _setEventListeners() {
    //дизейблим кнопку по умолчанию
    this._toggleButtonState();

    //перебираем спсок всех инпутов
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);

      //ставим обработчик на каждый инпут
      inputElement.addEventListener('input', () => {
        // Проверяем валидность, выводим или скрываем ошибку
        this._checkInputValidity(inputElement);
        //устанавливаем дизэйбл для кнопки
        this._toggleButtonState()

      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

