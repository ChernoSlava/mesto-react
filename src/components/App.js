import ".././index";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
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

  function handleUpdateAvatar(data) {
    api.setUserAvatarToServer(data).then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      },
      (err) => {
        console.log(err);
      }
    );
  }

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

   function handleAddPlaceSubmit(data) {
    api.postCard(data).then((newCard) => {
       setCards([newCard, ...cards]); 
        closeAllPopups();
    },
    (err) => {
      console.log(err);
    }
    );
  }

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
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
