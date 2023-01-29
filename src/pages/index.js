// Импортируем данные из модулей
import "./index.css";

import Api from "../components/Api";
import { Card } from "../components/Card.js";
import { config } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  popupOpenButton,
  addButton,
  popupNameEdit,
  popupJobEdit,
  formEdit,
  formAdd,
  popupView,
  avatarImage,
  formAvatar,
} from "../utils/data.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWihtConfirm";

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-54`,
  headers: {
    authorization: "234760c4-c169-4c5e-95d9-4ebca7efc3f0",
    "Content-Type": "application/json",
  },
});

avatarImage.addEventListener("click", () => {
  editAvatar.open();
  formAvatarValidate.disableAddSubmitBtn();
});
const editAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar",

  submitFormHandler: (data) => {
    editAvatar.renderLoading(true);
      api.changeAvatar(data)
        .then(res => {
        profileInfo.setUserInfo(res);
         editAvatar.close()
      })
   
    .catch((err) => console.log(err))
    .finally(() => {
      editAvatar.renderLoading(false);
    });
  },
});
editAvatar.setEventListeners();

const profileInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__profession",
  avatar: ".profile__avatar-image",
});

const editProfile = new PopupWithForm({
  popupSelector: ".popup_edit",

  submitFormHandler: (data) => {
    editProfile.renderLoading(true);
      api.changeProfile(data.name, data.about)

      .then(res => {
  profileInfo.setUserInfo(res);
        editProfile.close()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfile.renderLoading(false);
      });
 
  },
});
editProfile.setEventListeners();

const confirmDelete = new PopupWithConfirm({
  popupSelector: ".popup_confirm",
});
confirmDelete.setEventListeners();

// Слушатели на кнопки открытия попапов
popupOpenButton.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();
  popupNameEdit.value = name;
  popupJobEdit.value = about;

  editProfile.open();
});

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  submitFormHandler: (data) => {
    addCardPopup.renderLoading(true);
    api.addCard(data)
      .then((data) => {
        cardList.addNewItem(creatCard(data, data.owner._id));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  }
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  formAddValidate.disableAddSubmitBtn();
});

addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_view");
      imagePopup.setEventListeners(popupView);

// Создание новой карточки
const creatCard = (item, userId) => {
  const card = new Card(
    {
      data: item,
      currentUserId: userId,
    
      handleCardClick: () => {
        imagePopup.open(item);
      },

      hendleDelete: () => {
        confirmDelete.open();
        confirmDelete.handleDeleteCard(() => {
          api.deleteCard(card.getId())
             .then(() => {
              card.deleteCard();
              confirmDelete.close();
          })
          .catch((err) => {
              console.log(err);
          });
  
        }
        )
      },
     
      handleCardLikeSetting: (cardId) => {
        api.setLike(cardId)
          .then((data) => {
          card.updateLikes(data);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
      },
      handleCardLikeRemoving: (cardId) => {
        api.removeLike(cardId)
          .then((data) => {
            card.updateLikes(data);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
      }
    },
    "#element-card"
  ); 
  return card.generateCard();
};
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    userId = user._id;
    cardList.renderItems(cards, user._id);
    profileInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    renderer: (item, userId) => {
      cardList.addItem(creatCard(item, userId));
    },
  },
  ".elements"
);


// Включаем валидацию для попапов
const formEditValidate = new FormValidator(formEdit, config);
formEditValidate.enableValidation();

const formAddValidate = new FormValidator(formAdd, config);

formAddValidate.enableValidation();

const formAvatarValidate = new FormValidator(formAvatar, config);
formAvatarValidate.enableValidation();
