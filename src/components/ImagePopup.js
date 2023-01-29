function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_view ${
        Object.keys(card).length !== 0 ? `popup_opened` : ""
      }`}
    >
      <div className="popup__view-container">
        <button
          aria-label="Close"
          type="button"
          className="popup__close-popup popup__view-close popup__button-close"
          onClick={onClose}
        />
        <figure className="popup__view-fig">
          <img
            className="popup__view-img"
            src={`${card.link}`}
            alt={card.name}
          />
          <figcaption className="popup__view-name">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
