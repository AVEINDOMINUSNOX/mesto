import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm  from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/Userinfo.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import {
  profileEditButton,
  profileAddButton,
  profileFormElement,
  cardsFormElement,
  nameInput,
  jobInput,
  validationConfig
} from '../scripts/utils/constants.js';

import './index.css';

//Валидация форм
const validationFormProfile = new FormValidator(validationConfig, profileFormElement);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, cardsFormElement);
validationFormCard.enableValidation();

//Пользователь
//Данные о пользователе
const userInfo = new UserInfo('.profile__user-name','.profile__user-specialization') ;
//Форма редактирования данных пользователя
const popupEditProfile = new PopupWithForm('#profile-form-container', handleProfileSubmit);
popupEditProfile.setEventListeners();

function handleProfileSubmit(data) {
  userInfo.setUserInfo(data['name'], data['specialization']);
  popupEditProfile.close();
}

//Фотокарточки
//Попап фотокарточки
const imgPopup = new PopupWithImage('#img-container');
imgPopup.setEventListeners();

//Форма добаления фотокарточки
const popupAddCard = new PopupWithForm('#cards-form-container', handleCardSubmit)
popupAddCard.setEventListeners();

function handleCardSubmit(data) {
  const dataCard = { name: data['place'], link: data['link'] };
  renderCard.addItem(createCard(dataCard, ".item-template"));
  popupAddCard.close();
}
//Создаем фотокарточку
function createCard(data) {
  const newAddCard = new Card(data, ".item-template", handleCardClick);
  return newAddCard.generateCard();
}
//Открытие попапа фотокарточки
function handleCardClick(name, link) {
  imgPopup.open(name, link);
}
//Отрисовываем фотокарточку
const renderCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item, ".item-template");
    renderCard.addItem(newCard);
  }
}, '.elements');
//Отображаем фотокарточку на странице
renderCard.renderItems();


//Слушатели событий
//Открытие попапа добавления фотокарточки
profileAddButton.addEventListener('click', () => {
  validationFormCard.disableSubmitButton()
  popupAddCard.open();
});

//Открытие попапа редактированя данных пользователя
profileEditButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
});

