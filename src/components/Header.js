import React from "react";

import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Логотип социальной сети Место, с подписью
      Россия"
        src={logo}
      />
      <div className="header__line"></div>
    </header>
  );
}
