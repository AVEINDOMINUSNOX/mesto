export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

export const profileFormElement = document.forms["profile-form-element"];
export const cardsFormElement = document.forms["cards-form-element"];

export const nameInput = profileFormElement.elements.name;
export const jobInput = profileFormElement.elements.specialization;

export const validationConfig = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_visible'
};
