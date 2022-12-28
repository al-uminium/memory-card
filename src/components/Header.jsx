import React from 'react';
import reset from '../icons/reset.svg';
import sitrus from '../icons/sitrusberry.png';
import './styles/Header.css';

function Header() {
  return (
    <div className="Header">
      <div className="logo-wrapper">
        <img className="logo" alt="logo" src={sitrus} />
        <div className="header-title">Memory Card Game</div>
      </div>
      <div className="button-wrapper">
        <img className="restart-button" alt="restart button" src={reset} />
      </div>
    </div>
  );
}

export default Header;
