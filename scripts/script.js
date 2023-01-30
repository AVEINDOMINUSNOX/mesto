import Card from './Card.js';
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

const itemTemplate = document.querySelector('#item-template');
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
function cardOpenPopup(name, link) {
  figcaptionImg.textContent = name;
  fullscreenImg.src = link;
  fullscreenImg.alt = name;
  openPopup(imgPopup);
}

/*Функция сохранения фотокарточки*/
function saveCard(evt) {
  evt.preventDefault();
  const dataNewCard = { name: placeInput.value, link: linkInput.value };
  const addNewCard = new Card(dataNewCard, '.item-template', cardOpenPopup);
  itemsContainer.prepend(addNewCard.generateCard());
  closePopup(cardsPopup);
  evt.target.reset();
  evt.submitter.classList.add(validationConfig.inactiveButtonClass)
  evt.submitter.disabled = true;
}

/*Добавление фотокарточки*/
initialCards.forEach((data) => {
  const card = new Card(data, '.item-template', cardOpenPopup);
  const cardElement = card.generateCard();
  itemsContainer.prepend(cardElement);
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


enableValidation(validationConfig);



