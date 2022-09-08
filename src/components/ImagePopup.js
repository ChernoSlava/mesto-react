import React from "react";

export default function ImagePopup() {
  return (
    <>
      <div className="popup image-popup" id="popupCardView">
        <div className="popup__image-container container">
          <img
            src="https://images.unsplash.com/photo-1596995804697-27d11d43652e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2QlMjBrZWJhYnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            className="popup__image"
            alt="Красота"
          />
          <h2 className="popup__image-title">В путешествие?</h2>
          <button type="button" className="popup__close-icon"></button>
        </div>
      </div>
    </>
  );
}
