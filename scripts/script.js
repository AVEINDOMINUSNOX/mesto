const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const popup = pageContainer.querySelector('.popup');
const editPopup = pageContainer.querySelector('#edit-form-container');
const addPopup = pageContainer.querySelector('#add-form-container');
const imgPopup = pageContainer.querySelector('#img-form-container');

const editCloseButton = editPopup.querySelector('#edit-close-button');
const addCloseButton = addPopup.querySelector("#add-close-button");

const imgCloseButton = imgPopup.querySelector('#img-close-button');
const fullscreenImg = imgPopup.querySelector('.popup__img-fullscreen');
const figcaptionImg = imgPopup.querySelector('.popup__img-title');

const itemTemplate = document.querySelector('#item-template');
const itemsContainer = document.querySelector('.elements');

const nameProfile = profile.querySelector('.profile__user-name');
const jobProfile = profile.querySelector('.profile__user-specialization');
const editFormElement = editPopup.querySelector('.popup__input-container');
const nameInput = editPopup.querySelector('#edit-name-input');
const jobInput = editPopup.querySelector('#edit-specialization-input');

const placeInput = addPopup.querySelector('#add-place-input');
const linkInput = addPopup.querySelector('#add-link-input');
const addFormElement = addPopup.querySelector('.popup__input-container');


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
const createItem = (nameItem, linkItem) => {
  const item = itemTemplate.content.querySelector('.item').cloneNode(true);
  const itemDelButton = item.querySelector('#delete-button');
  const itemImg = item.querySelector('.item__image');
  const itemLikeButton = item.querySelector('#like-button');
  const itemName = item.querySelector('.item__name');
  itemName.textContent = nameItem;
  itemImg.src = linkItem;
  itemImg.alt = nameItem;
  /*Открытие попапа фотокарточки*/
  itemImg.addEventListener('click', () => {
    openPopup(imgPopup);
    figcaptionImg.textContent = itemName.textContent;
    fullscreenImg.src = itemImg.src;
    fullscreenImg.alt = itemImg.alt;
  })
  /*Добавление лайка*/
  itemLikeButton.addEventListener('click', () => { itemLikeButton.classList.toggle('item__like-button_status_active'); });
  /*Удаление фотокарточки*/
  itemDelButton.addEventListener('click', () => { item.remove(); });
  /*Закрытие фотокарточки*/
  imgCloseButton.addEventListener('click', () => { closePopup(imgPopup) })
  return item
}

const renderCards = (nameItem, linkItem) => {
  itemsContainer.prepend(createItem(nameItem, linkItem))
}
initialCards.forEach((item) => {
  renderCards(item.name, item.link);
})

/*Сохранение фотокарточки*/
function saveItem(evt) {
  evt.preventDefault();
  if (placeInput.value === "" || linkInput.value === "")
    return alert("Данные отсутствуют. Введите данные или закройте окно");
  initialCards.push({ name: placeInput.value, link: linkInput.value });
  renderCards(placeInput.value, linkInput.value);
  closePopup(addPopup);
  evt.target.reset();
}

/*Открытие попапа добавления фотокарточек*/
profileAddButton.addEventListener('click', () => { openPopup(addPopup) })

/*Открытия попапа редактирования данных пользователя*/
profileEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
/*Закрытие попапа добавления фотокарточек*/
addCloseButton.addEventListener('click', () => { closePopup(addPopup) });
/*Закрытие попапап редактирования данных пользователя*/
editCloseButton.addEventListener('click', () => { closePopup(editPopup) });
/*Сохранение данных пользователя через нажатие кнопки сохранить*/
editFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (nameInput.value === "" || jobInput.value === "")
    return alert("Данные отсутствуют. Введите данные или закройте окно");
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopup);
});
/*Сохранение фотокарточки, через нажатие кнопки создать*/
addFormElement.addEventListener('submit', saveItem);





