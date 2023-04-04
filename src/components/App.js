import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Register from "./Register";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import * as auth from "../utils/auth";
import NavBar from "./NavBar";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import error from "../images/error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(false);
  const navigate = useNavigate();
  const [checkToken, setCheckToken] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [info, setInfo] = useState({ image: "", text: "" });

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setCheckToken(true);
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/", { replace: true });
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked === false)
      api
        .setLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    else
      api
        .removeLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleDeleteSubmit(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setDeletedCard({});
    setSelectedCard({});
    setShowTooltip(false);
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api
      .changeProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function ChooseInfoTooltip(info) {
    setInfo({ image: info.image, text: info.text });
  }

  function handleLogin(password, email) {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setShowTooltip(true);
        ChooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setTimeout(setShowTooltip, 1000, true);
        ChooseInfoTooltip({
          image: success,
          text: "Вы успешно зарегистрировались",
        });
        setTimeout(navigate, 3000, "/sign-in");
        setEmail(email);
      })
      .catch((err) => {
        setTimeout(setShowTooltip, 1000, true);
        ChooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-up");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <NavBar loggedIn={loggedIn} email={email} signOut={signOut} />
      </Header>
      <Routes>
        <Route
          exact
          path="/sign-up"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          exact
          path="/sign-in"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          exact
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn} checkToken={checkToken}>
              <Main
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading}
              />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />

              <ConfirmDeletePopup
                isOpen={isConfirmDeletePopupOpen}
                onClose={closeAllPopups}
                isLoading={isLoading}
                onDelete={handleDeleteSubmit}
                card={deletedCard}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />
      </Routes>

      <InfoTooltip isOpen={showTooltip} onClose={closeAllPopups} info={info} />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
