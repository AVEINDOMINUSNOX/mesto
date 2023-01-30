export default class Card {

  constructor(data, templateSelector, cardOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
    this._cardOpenPopup = cardOpenPopup;

  }

  _getTemplate() {

    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.item')
      .cloneNode(true);

    return card;
  }

  _likeCard() {
    this._newCard.querySelector('#like-button')
      .classList.toggle('item__like-button_status_active');
  }

  _deleteCard() {
    this._newCard.remove();
    this._element = null;
  }

  _setData() {
    this._newCard.querySelector('.item__name')
      .textContent = this._name;

    this._linkElement = this._newCard
      .querySelector('.item__image');
    this._linkElement.src = this._link;
    this._linkElement.alt = this._name;
  }

  _setEventListeners() {
    this._setData;
    this._newCard.querySelector('#like-button')
      .addEventListener('click', () => {
        this._likeCard()
      });

    this._newCard.querySelector('#delete-button')
      .addEventListener('click', () => {
        this._deleteCard()
      });

    this._newCard.querySelector('.item__image')
      .addEventListener('click', () => {
        this._cardOpenPopup(this._name, this._link);
      });
  }

  generateCard() {
    this._newCard = this._getTemplate();

    this._setData();
    this._setEventListeners();


    return this._newCard
  }
}






