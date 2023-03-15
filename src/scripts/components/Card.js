export default class Card {

  constructor(data, isOwner, templateSelector, handleCardClick,
    { handleAddLikeClick, handleDeleteLikeClick, handleDeleteCard }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._isOwner = isOwner;
    this._owner = data.owner;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteCard = handleDeleteCard;
    this._delete = this._handleDeleteCard.bind(this);
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
  likeCard() {
    this._likeButton.classList
      .toggle('item__like-button_status_active');
  }

  // Счетчик лайков
  counterLikes(counter) {
    this._likeCounter.textContent =
      counter > 0 ? counter : "";
  }

  // Отрисовываем лайки пользователя
  _renderLike() {
    this._likes.forEach(() => {
      if (this._isOwner) {
        this._likeButton
          .classList.add('item__like-button_status_active');
      }
    })
  }

  // Описываем метод удаления фотокарточки
  removeCard() {  //Думал, что для наглядности можно назвать метод ремув, чтобы была отсылка к  this._newCard.remove(); Буду иметь в виду, что так делать опасно
    this._newCard.remove();
    this._newCard = null;
  }

  //Получаем данные для формирования фотокарточки
  _setData() {
    this._likeCounter = this._newCard
      .querySelector(".item__like-counter");

    this._cardImg = this._newCard
      .querySelector('.item__image');

    this._deleteButton = this._newCard
      .querySelector('.item__del-button');

    this._likeButton = this._newCard
      .querySelector('.item__like-button ')

    this._newCard.querySelector('.item__name')
      .textContent = this._name;

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._brokenLink = require('../../images/error404.png');
  }

  // Вешаем слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("item__like-button_status_active")) {
        this._handleDeleteLikeClick();
      } else {
        this._handleAddLikeClick();
      }
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardImg.addEventListener("error", () => {
      this._cardImg.src = require('../../images/error404.png');
      this._cardImg.addEventListener("click", () => {
        this._handleCardClick(this._name, this._brokenLink);
      });
    })
  }

  //Отрисовываем корзину у владельца фотокарточки
  _renderWastebasket() {
    if (this._isOwner) {
      this._deleteButton.classList.add('item__del-button_status_active');
    }
  }

  //Генерация фотокарточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    this._renderWastebasket();
    this.counterLikes(this._likes.length);
    this._renderLike();
    return this._newCard
  }

}







