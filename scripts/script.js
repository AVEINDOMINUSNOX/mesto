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

const itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
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


import { initialCards } from './initialCards.js';

/*Открытие попапа*/
const openPopup = (popup) => {
  popup.classList.add('popup_open');
}
/*закрытие попапа*/
const closePopup = (popup) => {
  popup.classList.remove('popup_open');
}

/*Отображение массива фотокарточек*/
const createCard = (nameCard, linkCard) => {
  const card = itemTemplate.cloneNode(true);
  const cardDelButton = card.querySelector('#delete-button');
  const cardImg = card.querySelector('.item__image');
  const cardLikeButton = card.querySelector('#like-button');
  const cardName = card.querySelector('.item__name');
  cardName.textContent = nameCard;
  cardImg.src = linkCard;
  cardImg.alt = nameCard;

  /*Открытие попапа фотокарточки*/
  cardImg.addEventListener('click', () => {
    openPopup(imgPopup);
    figcaptionImg.textContent = cardName.textContent;
    fullscreenImg.src = cardImg.src;
    fullscreenImg.alt = cardImg.alt;
  })
  /*Добавление лайка*/
  cardLikeButton.addEventListener('click', () => { cardLikeButton.classList.toggle('item__like-button_status_active'); });
  /*Удаление фотокарточки*/
  cardDelButton.addEventListener('click', () => { card.remove(); });
  return card
}

const renderCard = (nameCard, linkCard) => {
  itemsContainer.prepend(createCard(nameCard, linkCard))
}
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
})

/*Закрытие фотокарточки*/
imgCloseButton.addEventListener('click', () => { closePopup(imgPopup) })
/*Закрытие фотокарточки кликом на оверлей*/
imgPopup.addEventListener('click', function (closedPopup) {
  if (closedPopup.target === closedPopup.currentTarget) {
    closePopup(imgPopup);
  }
});

/*Сохранение фотокарточки*/
function saveCard(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  closePopup(cardsPopup);
  evt.target.reset();
  evt.submitter.classList.add(validationConfig.inactiveButtonClass)
  evt.submitter.disabled = true;
}

/*Открытие попапа добавления фотокарточек*/
profileAddButton.addEventListener('click', () => { openPopup(cardsPopup) })

/*Открытия попапа редактирования данных пользователя*/
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

/*Закрытие попапа добавления фотокарточек*/
cardsCloseButton.addEventListener('click', () => { closePopup(cardsPopup) });
/*Закрытие попапа добавления фотокарточек кликом на оверлей*/
cardsPopup.addEventListener('click', function (closedPopup) {
  if (closedPopup.target === closedPopup.currentTarget) {
    closePopup(cardsPopup);
  }
});

/*Закрытие попапа редактирования данных пользователя*/
profileCloseButton.addEventListener('click', () => { closePopup(profilePopup) });

/*Закрытие попапа редактирования данных пользователя кликом на оверлей*/
profilePopup.addEventListener('click', function (closedPopup) {
  if (closedPopup.target === closedPopup.currentTarget) {
    closePopup(profilePopup);
  }
});

/*Закрытие попапов кнопкой "Esc"*/
document.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    closePopup(profilePopup);
    closePopup(cardsPopup);
    closePopup(imgPopup);
  }
})

/*Сохранение данных пользователя через нажатие кнопки сохранить*/
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
});

/*Сохранение фотокарточки, через нажатие кнопки создать*/
cardsFormElement.addEventListener('submit', saveCard);

enableValidation(validationConfig);



