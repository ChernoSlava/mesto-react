import React, { useState, useEffect } from "react";
import profileBtn from "../images/Profile__Edit-Button.svg";
import Card from "./Card";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick,  }) {
  
  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCard = cards.filter((e) => e !== card);
        setCards(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    api
      .getCards()
      .then((info) => {
        setCards(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar-element"
          />
          <button
            className="profile__avatar-btn"
            type="button"
            onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__button"
            onClick={onEditProfile}
          >
            <img src={profileBtn} alt="Кнопка редактирования" />
          </button>
          <p className="profile__subtitle">{currentUser.description}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
