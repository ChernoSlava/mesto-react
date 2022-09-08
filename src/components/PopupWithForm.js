import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name}-popup ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup__container container ${props.container}`}>
        <p className="popup__title">{props.title}</p>
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form ${props.name}-form`}
          name={props.name}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}
