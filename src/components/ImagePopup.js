import React from "react";

export default function ImagePopup(props) {
  return (
    <>
      <div className={`popup image-popup ${props.card && "popup_opened"}`}>
        <div className="popup__image-container container">
          <img
            src={`${props.card.link}`}
            className="popup__image"
            alt={`${props.card.name}`}
          />
          <h2 className="popup__image-title">{props.card.name}</h2>
          <button
            type="button"
            className="popup__close-icon"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}
