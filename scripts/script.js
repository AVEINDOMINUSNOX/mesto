import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const profilePopup = pageContainer.querySelector('#profile-form-container');
const cardsPopup = pageContainer.querySelector('#cards-form-container');
const imgPopup = pageContainer.querySelector('#img-container');
const popupList = Array.from(pageContainer.querySelectorAll('.popup'));

const profileCloseButton = profilePopup.querySelector('#profile-close-button');
const cardsCloseButton = cardsPopup.querySelector("#cards-close-button");

const imgCloseButton = imgPopup.querySelector('#img-close-button');
const fullscreenImg = imgPopup.querySelector('.popup__img-fullscreen');
const figcaptionImg = imgPopup.querySelector('.popup__img-title');

const itemsContainer = document.querySelector('.elements');

const nameProfile = profile.querySelector('.profile__user-name');
const jobProfile = profile.querySelector('.profile__user-specialization');

const profileFormElement = document.forms["profile-form-element"];
const cardsFormElement = document.forms["cards-form-element"];

const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.specialization;

const placeInput = cardsFormElement.elements.place;
const linkInput = cardsFormElement.elements.link;

const validationConfig = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_visible'
};

//Валидация форм
const validationFormProfile = new FormValidator(validationConfig, profileFormElement);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, cardsFormElement);
validationFormCard.enableValidation();


//Описание функций
/*Открытие попапа*/
const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_open');
}
/*закрытие попапа*/
const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupEsc);
  popup.classList.remove('popup_open');
}
/*Закрытие попапа через ESC*/
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_open');
    closePopup(popup);
  }
}

/*функция открытия попапа фотокарточки*/
function openCardPopup(name, link) {
  figcaptionImg.textContent = name;
  fullscreenImg.src = link;
  fullscreenImg.alt = name;
  openPopup(imgPopup);
}

/*Функция создание карточки*/
function createCard(dataNewCard, _templateSelectorCard) {
  const addNewCard = new Card(dataNewCard, '.item-template', openCardPopup);
  return addNewCard.generateCard();
}

/*Функция добавление картточки*/
function addCard(cardElement) {
  itemsContainer.prepend(cardElement);
}

/*Функция сохранения фотокарточки*/
function saveCard(evt) {
  evt.preventDefault();
  const dataNewCard = { name: placeInput.value, link: linkInput.value };
  addCard(createCard(dataNewCard, '.item-template'));
  closePopup(cardsPopup);
  evt.target.reset();
  validationFormCard.disableSubmitButton();
}

initialCards.forEach((cardElement) => {
  addCard(createCard(cardElement, '.item-template'));
});


//Слушатели событий
/*Открытие попапа добавления фотокарточек кликом*/
profileAddButton.addEventListener('click', () => { openPopup(cardsPopup) })

/*Открытия попапа редактирования данных пользователя кликом*/
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

/*Закрытие попапа добавления фотокарточек кликом*/
cardsCloseButton.addEventListener('click', () => { closePopup(cardsPopup) });

/*Закрытие попапа редактирования данных пользователя кликом*/
profileCloseButton.addEventListener('click', () => { closePopup(profilePopup) });

/*Закрытие попапа фотокарточки кликом*/
imgCloseButton.addEventListener('click', () => { closePopup(imgPopup) });

/*Закрытие попапа кликом на оверлей*/
popupList.forEach((popup) => {
  popup.addEventListener('click', function (closedPopup) {
    if (closedPopup.target === closedPopup.currentTarget) {
      closePopup(popup);
    }
  })
});

/*Сохранение данных пользователя кнопкой сохранить*/
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
});

/*Сохранение фотокарточки кнопкой создать*/
cardsFormElement.addEventListener('submit', saveCard);





