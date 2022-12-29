import React from 'react';
import './styles/Card.css';

function Card({ url, id, playerChoice }) {
  return (
    <div className="card-wrapper">
      <img alt="sprite" src={url} className="sprite-image" id={id} onClick={playerChoice} />
    </div>
  );
}

export default Card;
