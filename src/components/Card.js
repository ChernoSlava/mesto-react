import React from "react";

function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <button type="button" className="element__delete-button"></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button
            type="button"
            name="heart"
            className="element__heart"
            value=" "
          ></button>
          <p className="element__number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
