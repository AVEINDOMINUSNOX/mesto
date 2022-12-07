const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profile.querySelector('.profile__edit-button');
const popup = pageContainer.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

let nameProfile = profile.querySelector('.profile__user-name');
let jobProfile = profile.querySelector('.profile__user-specialization');
/*let formElement = popup.querySelector('.popup__input-container');
 Раз мы уже указали имя в html, здесь уже можно не указывать?
 код работает и так, и так*/
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_specialization');
let itemName = pageContainer.querySelector('.itemName');

/*Я уже не могу придумать как иначе реализовать изменение названия последней карточке при
изменении ширины экрана)) */
function change(){
 if (document.documentElement.clientWidth > 620){
  document.getElementById("itemName").textContent = "Карачаево-Черкесия";
}else{
  document.getElementById("itemName").textContent = "Карачаевск";
}
 }

function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function savePopup(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', savePopup);
window.addEventListener("resize", change);


/*Реализовал закрытие popup нажатием на любую область, кроме как popup__container, но потому увидел,
что в задании такого не было и решил не включать данную фичу, а удалять код жалко
popup.addEventListener('click', function(closedPopup){
  if(closedPopup.target === closedPopup.currentTarget) {
    closed();
  }
});
*/



