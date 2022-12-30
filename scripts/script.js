const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const editPopup = pageContainer.querySelector('#edit-form-container');
const addPopup = pageContainer.querySelector('#add-form-container');

const editCloseButton = editPopup.querySelector('#edit-close-button');
const addCloseButton = addPopup.querySelector("#add-close-button")

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


let nameProfile = profile.querySelector('.profile__user-name');
let jobProfile = profile.querySelector('.profile__user-specialization');
let editFormElement = editPopup.querySelector('.popup__input-container');
let nameInput = editPopup.querySelector('#edit-name-input');
let jobInput = editPopup.querySelector('#edit-specialization-input');

let placeInput = addPopup.querySelector('#add-place-input');
let linkInput = addPopup.querySelector('#add-link-input');
let addFormElement = addPopup.querySelector('.popup__input-container');







function closeEditPopup() {
  editPopup.classList.remove('popup_open');
}

function closeAddPopup() {
  addPopup.classList.remove('popup_open');
  placeInput.value = '';
  linkInput.value = '';
}

profileAddButton.addEventListener('click', () => { addPopup.classList.add('popup_open'); })
profileEditButton.addEventListener('click', () => {
  editPopup.classList.add('popup_open');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

editCloseButton.addEventListener('click', closeEditPopup);
addCloseButton.addEventListener('click', closeAddPopup);
editFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditPopup();

});

addFormElement.addEventListener('submit', saveItem);



const itemTemplate = document.querySelector('#item-template');
const itemsContainer = document.querySelector('.elements')

const createItem = (nameItem, linkItem) => {
  const item = itemTemplate.content.querySelector('.item').cloneNode(true);
  const itemImg = item.querySelector('.item__image');
  const itemLikeButton = item.querySelector('.item__like-button')
  item.querySelector('.item__name').textContent = nameItem;
  itemImg.src = linkItem;
  itemImg.alt = nameItem;
  return item
}

const renderCards = (nameItem, linkItem) => {
  itemsContainer.prepend(createItem(nameItem, linkItem))
}

initialCards.forEach((item) => {
  renderCards(item.name, item.link);
})

function saveItem (evt) {
  evt.preventDefault();
  if (placeInput.value === "" || linkInput.value === "")
    return alert("Данные введены не корректно. Введите данные по новой или закройте окно");
  initialCards.push({ name: placeInput.value, link: linkInput.value });
  renderCards(placeInput.value, linkInput.value);
  closeAddPopup();
  evt.target.reset();
}

