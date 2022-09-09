import { useState, useEffect } from "react";
import profileBtn from "../images/Profile__Edit-Button.svg";
import Card from "./Card";
import api from "../utils/api";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((info) => {
        const [userInfo, cardsInfo] = info;
        setUserAvatar(userInfo.avatar);
        setUserDescription(userInfo.about);
        setUserName(userInfo.name);
        setCards(cardsInfo);
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
            src={userAvatar}
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
          <h1 className="profile__title">{userName}</h1>
          <button
            type="button"
            className="profile__button"
            onClick={onEditProfile}
          >
            <img src={profileBtn} alt="Кнопка редактирования" />
          </button>
          <p className="profile__subtitle">{userDescription}</p>
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
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
