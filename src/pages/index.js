import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/Userinfo.js';
import PopupConfirm from '../scripts/components/PopupConfirmation.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import {
  profileEditButton,
  profileAddButton,
  editAvatarButton,
  profileFormElement,
  cardsFormElement,
  avatarFormElement,
  nameInput,
  jobInput,
  validationConfig
} from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';

import './index.css';

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    Authorization: "9082d6a2-bb5f-45e9-adaf-9f20e9e45d32",
    "Content-Type": "application/json",
  },
});






//Аватар
const popupEditAvatar = new PopupWithForm("#avatar-form-container", handleAvatarSubmit);
popupEditAvatar.setEventListeners();

function handleAvatarSubmit(data) {
  popupEditAvatar.renderLoading("Обновление...");
  api.saveAvatar(data["link-avatar"])
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading("Сохранить");
      popupEditAvatar.close();
    });
}


editAvatarButton.addEventListener("click", () => {
  popupEditAvatar.open();
});


//Данные о пользователе
const userInfo = new UserInfo('.profile__user-name', '.profile__user-specialization', '.profile__avatar');
//Форма редактирования данных пользователя

const popupEditProfile = new PopupWithForm('#profile-form-container', handleProfileSubmit);
popupEditProfile.setEventListeners();

/* function handleProfileSubmit(data) {
  userInfo.setUserInfo(data['name'], data['specialization']);
  popupEditProfile.close();
} */

function handleProfileSubmit(data) {
  popupEditProfile.renderLoading("Обновление...");
  api.saveUserInfo(data['name'], data['specialization'])
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about);
      popupEditProfile.close();
    })
    /* .catch((err) => {
      console.log(err);
    }) */
    .finally(() => {
      popupEditProfile.renderLoading("Сохранить");
    });
}



const popupConfirmDelete = new PopupConfirm("#confirmation-container");
popupConfirmDelete.setEventListeners();









//Фотокарточки
//Попап фотокарточки
const imgPopup = new PopupWithImage('#img-container');
imgPopup.setEventListeners();




// Узнаем является ли пользователь владельцем фотокарточки?
const isOwner = (cardId) => {
  return cardId.owner._id === userInfo.getUserInfo().id ? true : false;
};





/* //Форма добаления фотокарточки
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
 */

/* */

//---------------------------------------

//создание списка карточек для отображения
const renderCard = new Section(
  {
    renderer: (item) => {
      const _isOwner = isOwner(item);
      //создание карточки
      const card = createCard(item, _isOwner, ".item-template");
      //добавление карточки
      renderCard.addItem(card);
    },
  },
  ".elements"
);

const popupAddCard = new PopupWithForm('#cards-form-container', handleCardSubmit)
popupAddCard.setEventListeners();

function handleCardSubmit(data) {
  popupAddCard.renderLoading("Сохранение...");
  const dataCard = { name: data['place'], link: data['link'] };
  api
    .postCard(dataCard)
    .then((data) => {
      renderCard.addItem(createCard(data, true, ".item-template"));

      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      popupAddCard.renderLoading("Создать");
    });
}

function createCard(dataCard, _isOwner) {
  const card = new Card(dataCard, _isOwner, ".item-template", handleCardClick,

  //Установка лайка
     {handleAddLikeClick: () => {
      api
        .setLikeCard(dataCard._id)
        .then((dataCard) => {
          card.likeCard();
          card.updateCounterLikes(dataCard.likes.length);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    //Удаление лайка
      handleDeleteLikeClick: () => {
      api
        .deleteLike(dataCard._id)
        .then((dataCard) => {
          card.likeCard();
          card.updateCounterLikes(dataCard.likes.length);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    //Удаление фотокарточки владельцем
    handleDeleteCard:() => {
      popupConfirmDelete.open({
        remove: () => {
          api
            .deleteCard(dataCard)
            .then(() => {
              card.remove();
            })
            .catch((error) => {
              console.log(error.message);
            })
            .finally(() => {
              popupConfirmDelete.close();
            });
        },
      });
    },
  });
  return card.generateCard();
}















//Открытие попапа фотокарточки
function handleCardClick(name, link) {
  imgPopup.open(name, link);
}
















































//-------------------------------------



























//Слушатели событий
//Открытие попапа добавления фотокарточки
profileAddButton.addEventListener('click', () => {
  validationFormCard.disableSubmitButton()
  popupAddCard.open();
});

//Открытие попапа редактированя данных пользователя
profileEditButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  popupEditProfile.open();
});


const confirmationButton = document.querySelector('#confirmation-button');




//Отображение дефолтных данных о пользователе и фотокарточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserId(user._id);
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);

    renderCard.renderItems(cards)
  })
  .catch((err) => {
    console.log(err);
  });



//Валидация форм
const validationFormProfile = new FormValidator(validationConfig, profileFormElement);
validationFormProfile.enableValidation();
const validationFormCard = new FormValidator(validationConfig, cardsFormElement);
validationFormCard.enableValidation();
const validationFormAvatar = new FormValidator(validationConfig, avatarFormElement);
validationFormAvatar.enableValidation();
