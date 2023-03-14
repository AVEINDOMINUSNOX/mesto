import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/Userinfo.js';
import PopupConfirmation from '../scripts/components/PopupConfirmation.js';
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
  popupEditAvatar.loading("Обновление...");
  api.saveAvatar(data["link-avatar"])
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.loading("Сохранить");
      popupEditAvatar.close();
    });
}

//Данные о пользователе
const userInfo = new UserInfo('.profile__user-name', '.profile__user-specialization', '.profile__avatar');

//Форма редактирования данных пользователя
const popupEditProfile = new PopupWithForm('#profile-form-container', handleProfileSubmit);
popupEditProfile.setEventListeners();

function handleProfileSubmit(data) {
  popupEditProfile.loading("Обновление...");
  api.saveUserInfo(data['name'], data['specialization'])
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.loading("Сохранить");
    });
}


//Фотокарточки
//Попап фотокарточки
const imgPopup = new PopupWithImage('#img-container');
imgPopup.setEventListeners();


//Попап подтверждения удаления фотокарточки
const popupConfirmation = new PopupConfirmation("#confirmation-container");
popupConfirmation.setEventListeners();


// Узнаем является ли пользователь владельцем фотокарточки?
const isOwner = (card) => {
  return card.owner._id === userInfo.getUserInfo().id ? true : false;
};


//Форма добаления фотокарточки
const popupAddCard = new PopupWithForm('#cards-form-container', handleCardSubmit)
popupAddCard.setEventListeners();

function handleCardSubmit(data) {
  popupAddCard.loading("Сохранение...");
  const dataCard = { name: data['place'], link: data['link'] };
  api
    .postCard(dataCard)
    .then((data) => {
      renderCard.addItem(createCard(data, true, ".item-template"));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      popupAddCard.loading("Создать");
    });
}

//Создаем фотокарточку
function createCard(data, owner) {
  const card = new Card(data, owner, ".item-template", handleCardClick,
  { //Установка лайка
      handleAddLikeClick: () => {
        api.setLikeCard(data._id)
          .then((data) => {
            card.likeCard();
            card.counterLikes(data.likes.length);
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
      //Удаление лайка
      handleDeleteLikeClick: () => {
        api.deleteLikeCard(data._id)
          .then((data) => {
            card.likeCard();
            card.counterLikes(data.likes.length);
          })
          .catch((err) => {
            console.log(err.message);
          });
      },

      //Удаление фотокарточки
      handleDeleteCard: () => {
        popupConfirmation.open({
          handleSubmit: () => {
            api.deleteCard(data._id)
              .then(() => {
                card.remove();
                popupConfirmation.close();
              })
              .catch((err) => {
                console.log(err.message);
              })
              .finally(() => {
              popupConfirmation.loading("Удаление")
              });
          },
        });
      },
    });
  return card.generateCard();
}

//Отрисовываем фотокарточку
const renderCard = new Section({
    renderer: (item) => {
      const owner = isOwner(item);
      const newCard = createCard(item, owner, ".item-template");
      //Отображаем фотокарточку на странице
      renderCard.addItem(newCard);
    },
  },
  ".elements"
);

//Открытие попапа фотокарточки
function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

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

//Открытие попапа редактирования аватара
editAvatarButton.addEventListener("click", () => {
  validationFormAvatar.disableSubmitButton()
  popupEditAvatar.open();
});

//Отображение дефолтных данных о пользователе и фотокарточках
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
