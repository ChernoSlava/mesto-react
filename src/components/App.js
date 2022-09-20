import ".././index";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlerUpdateUser(data) {
    api.setUserInfoToServer(data).then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handlerUpdateUser}
        />


        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          btnClass={"form-card-btn"}
          buttonText={"Создать"}
        >
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
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить Аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          btnClass={"avatar"}
          buttonText={"Сохранить"}
        >
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
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          container="popup__container-delete"
          btnClass={"delete"}
          buttonText={"ДА"}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
