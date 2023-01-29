import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
  }, [props.isOpen]);

  useEffect(() => {
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeNamePlace(e) {
    setName(e.target.value);
  }
  function handleChangeLinkPlace(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"popup_add"}
      isOpen={props.isOpen}
      title={"Новое место"}
      onClose={props.onClose}
      btnText={"Создать"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingText="Сохранение..."
    >
      <fieldset className="form__set">
        <input
          type="text"
          className="popup__input popup__input_add_name"
          id="discr-input"
          placeholder="Название"
          name="name"
          required
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleChangeNamePlace}
        />
        <span className="form__input-error popup__input-error discr-input-error" />
        <input
          type="url"
          className="popup__input popup__input_add_link"
          id="url-input"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={link}
          onChange={handleChangeLinkPlace}
        />
        <span className="form__input-error popup__input-error url-input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
