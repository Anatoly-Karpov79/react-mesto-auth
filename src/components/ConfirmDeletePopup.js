import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props,{ card}) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDelete(props.card);
      }

return (
    <PopupWithForm
      name={"popup_confirm"}
      isOpen={props.isOpen}
      title={"Вы уверены?"}
      onClose={props.onClose}
      btnText={"Да"}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingText="Удаление..."
      
    >
      <fieldset className="form__set">
        
      </fieldset>
    </PopupWithForm>
)
}

export default ConfirmDeletePopup;