export default class Popup {

  constructor(selectorPopup) {
    this._selector = selectorPopup;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayCLose = this._handleOverlayCLose.bind(this);
  }

  open() {
    this._selector.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
    this._selector.addEventListener('click', this._handleOverlayCLose);
  }

  close() {
    this._selector.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClose);
    this._selector.removeEventListener('click', this._handleOverlayCLose);

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
    const closeButton = this._selector.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    });
}
}
