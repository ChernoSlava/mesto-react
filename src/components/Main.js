import React from "react";
import avatar from "../images/Profile__image.jpg";
import profileBtn from "../images/Profile__Edit-Button.svg";

function Main(props) {
  
  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <img
              src={avatar}
              alt="Фото профиля"
              className="profile__avatar-element"
            />
            <button
              className="profile__avatar-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">Ататюрк М.К.</h1>
            <button
              type="button"
              className="profile__button"
              onClick={props.onEditProfile}
            >
              <img src={profileBtn} alt="Кнопка редактирования" />
            </button>
            <p className="profile__subtitle">Первый президент Турции</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section>
          <ul className="elements"></ul>
        </section>
      </main>
    </>
  );
}

export default Main;
