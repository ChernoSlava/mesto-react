import React from "react";
import avatar from "../images/Profile__image.jpg";
import profileBtn from "../images/Profile__Edit-Button.svg";
import api from "../utils/api";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  React.useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((info) => {
        const userInfo = info;
        setUserAvatar(userInfo.avatar);
        setUserDescription(userInfo.about);
        setUserName(userInfo.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userAvatar, userDescription, userName]);

  return (
    <>
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
              onClick={props.onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__button"
              onClick={props.onEditProfile}
            >
              <img src={profileBtn} alt="Кнопка редактирования" />
            </button>
            <p className="profile__subtitle">{userDescription}</p>
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
