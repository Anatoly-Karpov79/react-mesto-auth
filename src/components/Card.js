import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__heart ${
    isLiked && "card__heart_activ"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="card__name">{card.name}</h2>
      {isOwn && <button className="card__delete" onClick={handleDeleteClick} />}

      <button
        className={cardLikeButtonClassName}
        type="button"
        onClick={handleLikeClick}
      >
        <p className="card__likes">{card.likes.length}</p>
      </button>
    </div>
  );
}

export default Card;
