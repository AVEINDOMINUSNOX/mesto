export default class Card {

  constructor(data, templateSelector, openCardPopup) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
    this._openCardPopup = openCardPopup;
  }

  //Находим разметку фотокарточки в html документе, копируем ее и возвращаем
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.item')
      .cloneNode(true);

    return card;
  }

  // Описываем метод добавления/удаления лайка
  _likeCard() {
    this._likeButton.classList.toggle('item__like-button_status_active');
  }
  // Описываем метод удаления фотокарточки
  _deleteCard() {
    this._newCard.remove();
    this._element = null;
  }

  //Получаем данные для формирования фотокарточки
  _setData() {
    this._deleteButton = this._newCard
      .querySelector('#delete-button')

    this._likeButton = this._newCard
      .querySelector('#like-button')

    this._newCard.querySelector('.item__name')
      .textContent = this._name;

    this._linkElement = this._newCard
      .querySelector('.item__image');
    this._linkElement.src = this._link;
    this._linkElement.alt = this._name;
  }

  // Вешаем слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard()
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    });

    this._linkElement.addEventListener('click', () => {
      this._openCardPopup(this._name, this._link);
    });
  }

  //Генерация карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard
  }

}






