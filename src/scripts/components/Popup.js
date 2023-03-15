export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayCLose = this._handleOverlayCLose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayCLose);

  }
//Описание закрытия попапа через esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
//Описание закрытия попапа по клику на оверлэй
  _handleOverlayCLose (evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

//Слушатели событий
  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    });
//Но ведь тогда закрытие по оверлею на каждом попапе срабатывает только один раз после загрузки страницы
    this._popup.addEventListener('mousedown', this._handleOverlayCLose);
}
}
