import PopupWithForm from "./PopupWithForm.js";
import React, { useContext, useState, useEffect } from "react";


function SignUp( {isOpen, onClose, isLoading ,handleSign_upClick, setIsSign_upOpen }) {

  

    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
      function handleChangePassword(e) {
        setDescription(e.target.value);
      }

      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
    
        // Передаём значения управляемых компонентов во внешний обработчик
        handleSign_upClick({
          email,
          about: description,
        });
      }
    return(
        <PopupWithForm
        name={"popup_edit"}
      isOpen={isOpen}
      title={"Регистрация"}
      onClose={onClose}
      btnText={"Сохранить"}
      onSubmit={handleSubmit}
      isLoading={isLoading}
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
          value={email || ""}
          onChange={handleChangeEmail}
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
          onChange={handleChangePassword}
        />
        <span className="form__input-error popup__input-error about-input-error" />
      </fieldset>

        </PopupWithForm>
        
    )
}

export default SignUp;