//Выводим ошибку
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//Скрываем ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

//Проверяем инпуты на св-во validity
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}
//Проверяем валидность всех инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

//изменение режимов кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
buttonElement.classList.add(config.inactiveButtonClass);
buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//Находим список инпутов каждой формы и вешаем обработчики на события инпут
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  //дизейблим кнопку по умолчанию
  toggleButtonState(inputList, buttonElement, config);
  //перебираем спсок всех инпутов
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    //ставим обработчик на каждый инпут
    inputElement.addEventListener('input', () => {
      // Проверяем валидность, выводим или скрываем ошибку
      checkInputValidity(formElement, inputElement, config);
      //устанавливаем дизэйбл для кнопки
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

//Находим все формы
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
}
