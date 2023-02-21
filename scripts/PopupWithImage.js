import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup){
    super(selectorPopup);

    this._fullscreenImg = this._selector.querySelector('.popup__img-fullscreen');
    this._figcaptionImg = this._selector.querySelector('.popup__img-title');
  }

  open(name, link){
    super.open();

    this._figcaptionImg.textContent = name;
    this._fullscreenImg.src = link;
    this._fullscreenImg.alt = name;
  }
}
