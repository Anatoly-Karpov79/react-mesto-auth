import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  
  
  const currentUser = React.useContext(CurrentUserContext)
  const {name, avatar, about } = currentUser;


  return (
    <>
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={avatar}
            alt="Ваша ава"
            name="avatar"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
          <p className="profile__profession">{about}</p>
        </div>
        <button
          aria-label="Add"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        {cards.map((card, _id) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            ></Card>
          );
        })}
      </section>
    </>
  );
}

export default Main;
