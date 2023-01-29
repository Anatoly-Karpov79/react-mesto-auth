import React, { createRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      data: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name={"popup_avatar"}
      isOpen={props.isOpen}
      title={"Обновить аватар"}
      onClose={props.onClose}
      btnText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingText="Сохранение..."
    >
      <fieldset className="form__set">
        <input
          ref={avatarRef}
          type="url"
          className="popup__input popup__input_avatar_link"
          id="url-avatar"
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="form__input-error popup__input-error url-avatar-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
