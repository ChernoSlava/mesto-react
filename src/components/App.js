import ".././index";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />

        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="popup__set">
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="popup__field popup__field_type_name"
                  placeholder="Ваше имя"
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="popup__field-error popup__field-error_field_name">
                  Необходимо заполнить данное поле
                </span>
                <input
                  id="job"
                  type="text"
                  name="job"
                  className="popup__field popup__field_type_job"
                  placeholder="Ваша работа"
                  minLength="2"
                  maxLength="200"
                  required
                />
                <span className="popup__field-error popup__field-error_field_job">
                  Необходимо заполнить данное поле
                </span>
                <button
                  type="submit"
                  className="popup__submit-button popup__submit-profile-btn"
                  id="btnEditProfile"
                >
                  Сохранить
                </button>
              </fieldset>
            </>
          }
        />
        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="popup__set">
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="popup__field popup__field_type_title"
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="popup__field-error popup__field-error_field_title">
                  Необходимо заполнить данное поле
                </span>
                <input
                  id="url"
                  type="url"
                  name="link"
                  className="popup__field popup__field_type_link"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="popup__field-error popup__field-error_field_link">
                  Необходимо заполнить данное поле
                </span>
                <button
                  type="submit"
                  className="popup__submit-button popup__submit-form-card-btn"
                  id="btnCreateCard"
                >
                  Создать
                </button>
              </fieldset>
            </>
          }
        />

        <PopupWithForm
          name="avatar"
          title="Обновить Аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="popup__set">
                <input
                  type="url"
                  name="avatar"
                  className="popup__field popup__field_type_avatar"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="popup__field-error popup__field-error_field_avatar">
                  Необходимо заполнить данное поле
                </span>
                <button
                  type="submit"
                  className="popup__submit-button popup__submit-avatar"
                  id="#"
                >
                  Сохранить
                </button>
              </fieldset>
            </>
          }
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          container="popup__container-delete"
          children={
            <>
              <button
                type="submit"
                className="popup__submit-button popup__submit-delete"
              >
                ДА
              </button>
            </>
          }
        />

        <template id="image">
          <li className="element">
            <button type="button" className="element__delete-button"></button>
            <img
              className="element__image"
              src="https://images.unsplash.com/photo-1450500392544-c2cb0fd6e3b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Хмю, опять что-то придумал?"
            />
            <div className="element__info">
              <h2 className="element__title">В путешествие?</h2>
              <div>
                <button
                  type="button"
                  name="heart"
                  className="element__heart"
                  value=" "
                ></button>
                <p className="element__number">0</p>
              </div>
            </div>
          </li>
        </template>
      </div>
    </>
  );
}

export default App;
