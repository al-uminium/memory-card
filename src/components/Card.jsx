import React from 'react';
import './styles/Card.css';

function Card({ url }) {
  return (
    <div className="card-wrapper">
      <img alt="sprite" src={url} className="sprite-image" />
    </div>
  );
}

export default Card;
