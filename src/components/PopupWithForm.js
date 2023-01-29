import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  btnText,
  children,
  onSubmit,
  isLoading,
  loadingText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button
          aria-label="Close"
          type="button"
          className="popup__close-popup popup__button-close"
          onClick={onClose}
        />
        <h3 className="popup__heading">{title}</h3>
        <form
          name="form"
          className={`popup__form  popup__${name}`}
          onSubmit={onSubmit}
        >
          <fieldset className="form__set">
            {children}
            <button type="submit" className="popup__button">
              {isLoading ? loadingText : btnText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
