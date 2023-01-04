const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const profilePopup = pageContainer.querySelector('#profile-form-container');
const cardsPopup = pageContainer.querySelector('#cards-form-container');
const imgPopup = pageContainer.querySelector('#img-form-container');

const profileCloseButton = profilePopup.querySelector('#profile-close-button');
const cardsCloseButton = cardsPopup.querySelector("#cards-close-button");

const imgCloseButton = imgPopup.querySelector('#img-close-button');
const fullscreenImg = imgPopup.querySelector('.popup__img-fullscreen');
const figcaptionImg = imgPopup.querySelector('.popup__img-title');

const itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
const itemsContainer = document.querySelector('.elements');

const nameProfile = profile.querySelector('.profile__user-name');
const jobProfile = profile.querySelector('.profile__user-specialization');
const profileFormElement = profilePopup.querySelector('.popup__input-container');
const nameInput = profilePopup.querySelector('#profile-name-input');
const jobInput = profilePopup.querySelector('#profile-specialization-input');

const placeInput = cardsPopup.querySelector('#cards-place-input');
const linkInput = cardsPopup.querySelector('#cards-link-input');
const cardsFormElement = cardsPopup.querySelector('.popup__input-container');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
  const cardLikeButton =  card.querySelector('#like-button');
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
  /*Закрытие фотокарточки*/
  imgCloseButton.addEventListener('click', () => { closePopup(imgPopup) })
  return card
}

const renderCard = (nameCard, linkCard) => {
  itemsContainer.prepend(createCard(nameCard, linkCard))
}
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
})

/*Сохранение фотокарточки*/
function saveCard(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  closePopup(cardsPopup);
  evt.target.reset();
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
/*Закрытие попапап редактирования данных пользователя*/
profileCloseButton.addEventListener('click', () => { closePopup(profilePopup) });
/*Сохранение данных пользователя через нажатие кнопки сохранить*/
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
});
/*Сохранение фотокарточки, через нажатие кнопки создать*/
cardsFormElement.addEventListener('submit', saveCard);





