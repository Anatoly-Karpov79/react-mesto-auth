function InfoTooltip({ isOpen, onClose, info }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container">
        <button
          aria-label="Close"
          type="button"
          className="popup__close-popup popup__button-close"
          onClick={onClose}
        />
        <div>
          <img
            className="popup__infoToolTip_image"
            src={info.image}
            alt={info.text}
          />
          <p className="popup__infoToolTip_text">{info.text}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
