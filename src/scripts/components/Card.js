export default class Card {

  constructor(data, isOwner, templateSelector, handleCardClick,
    { handleAddLikeClick, handleDeleteLikeClick, handleDeleteCard }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._isOwner = isOwner;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteCard = handleDeleteCard;
    this._delete = this._delete.bind(this);
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
    this._likeButton.classList.toggle('item__like-button_status_active');
  }

  // Обновляем количество лайков
  updateCounterLikes(counter) {
    this._newCard.querySelector(".item__like-counter").textContent =
      counter > 0 ? counter : "";
  }

  // Отрисовываем лайки пользователя
  _renderLike() {
    this._likes.forEach(() => {
      if (this._isOwner) {
   this._LikeButton.classList.add("item__like-button_status_active");
      }
    });
  }



  // Описываем метод удаления фотокарточки
  remove() {
    this._newCard.remove();
    this._newCard = null;
  }

  _delete() {
    this._handleDeleteCard(this._id);
  }

  //Получаем данные для формирования фотокарточки
  _setData() {
    this._likeCounter = this._newCard
      .querySelector(".item__like-counter");

    this._cardImg = this._newCard
      .querySelector('.item__image');



    this._likeButton = this._newCard
      .querySelector('#like-button')

    this._newCard.querySelector('.item__name')
      .textContent = this._name;

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

  }

  // Вешаем слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains("item__like-button_status_active"))
        this._handleDeleteLikeClick();
      else
        this._handleAddLikeClick();
    });

    /*  this._deleteButton.addEventListener('click', () => {
       this.remove()
     });
  */
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });



    /* this._cardImg.addEventListener('error', (error) => {
      this._cardImage.src = require();
    }) */

  }


     //отрисовать иконку "удалить" только у карточек владельца
     _renderWastebasket() {
      if (this._isOwner) {
        this._deleteButton = this._newCard.querySelector('.item__del-button')
         this._deleteButton.classList.add('.item__del-button_status_active');
          this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard(this._id);
          });
      }
    }

  //Генерация карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
     this._renderWastebasket();
    this.updateCounterLikes(this._likes.length);
   // this._renderLike();
    return this._newCard
  }

}







