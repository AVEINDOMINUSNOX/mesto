import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm  from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './Userinfo.js';
import { initialCards } from './initialCards.js';
import {
  profileEditButton,
  profileAddButton,
  profilePopup,
  cardsPopup,
  bigImgPopup,
  profileFormElement,
  cardsFormElement,
  nameInput,
  jobInput,
  validationConfig
} from './constants.js';

//Валидация форм
const validationFormProfile = new FormValidator(validationConfig, profileFormElement);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, cardsFormElement);
validationFormCard.enableValidation();

//Пользователь
//Данные о пользователе
const userInfo = new UserInfo('.profile__user-name','.profile__user-specialization') ;
//Форма редактирования данных пользователя
const popupEditProfile = new PopupWithForm(profilePopup, profileSubmit);
popupEditProfile.setEventListeners();

function profileSubmit(data) {
  userInfo.setUserInfo(data['name'], data['specialization']);
  popupEditProfile.close();
}

//Фотокарточки
//Попап фотокарточки
const imgPopup = new PopupWithImage(bigImgPopup);

//Форма добаления фотокарточки
const popupAddCard = new PopupWithForm(cardsPopup, cardSubmit)
popupAddCard.setEventListeners();

function cardSubmit(data) {
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
  imgPopup.setEventListeners();
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
  popupAddCard.open();
});

//Открытие попапа редактированя данных пользователя
profileEditButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
});
