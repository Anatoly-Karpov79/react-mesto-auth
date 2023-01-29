import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name={"popup_edit"}
      isOpen={props.isOpen}
      title={"Редактировать профиль"}
      onClose={props.onClose}
      btnText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingText="Сохранение..."
    >
      <fieldset className="form__set">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          id="name-input"
          placeholder="Имя"
          name="name"
          required
          minLength={2}
          maxLength={40}
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="form__input-error popup__input-error name-input-error" />
        <input
          type="text"
          className="popup__input popup__input_type_about"
          id="about-input"
          placeholder="Профессия"
          name="about"
          required
          minLength={2}
          maxLength={200}
          value={description || ""}
          onChange={handleChangeAbout}
        />
        <span className="form__input-error popup__input-error about-input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
