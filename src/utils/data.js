export const initialCards = [
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

  export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    inputErrorSelector: '.popup__input-error',
  }
  
  export const popupOpenButton = document.querySelector('.profile__edit-button');
  export const addButton = document.querySelector('.profile__add-button');
  export const popupNameEdit = document.querySelector('.popup__input_type_name');
  export const popupJobEdit = document.querySelector('.popup__input_type_about');
  export const formEdit = document.querySelector ('.form');
  export const formAdd = document.querySelector('#form__add');
  export const popupEdit = document.querySelector('.popup_edit');
  export const popupAdd = document.querySelector('.popup_add');
  export const popupView = document.querySelector('.popup_view');
  export const popups = document.querySelectorAll('.popup')
  export const nameInput = document.querySelector ('.profile__name');
  export const jobInput = document.querySelector ('.profile__profession');
  export const cardNameAdd = document.querySelector('.popup__input_add_name');
  export const cardImageAdd = document.querySelector('.popup__input_add_link');
  export const elements = document.querySelector('.elements');
  export const popupImage = document.querySelector('.popup__view-img');
  export const popupImageName = document.querySelector('.popup__view-name');
  export const popupAddSubmitBtn = document.querySelector('#popup__button-add');
  export const popupCloseBtn = document.querySelector('.popup__close-popup');
  export const avatarImage = document.querySelector('.profile__avatar-button');
  export const formAvatar = document.querySelector ('#form__avatar');
 // export const avatarButton = document.querySelector('profile__avatar-button')