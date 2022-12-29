import React from 'react';
import './styles/Stageboard.css';

function StageBoards({ stage }) {
  return (
    <div className="StageBoard-wrapper">
      <div className="StageBoard" />
      <span>Stage {stage}</span>
    </div>
  );
}

export default StageBoards;
