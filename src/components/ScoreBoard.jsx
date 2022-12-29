import React from 'react';
import './styles/ScoreBoard.css';

function ScoreBoard({ score, bestScore }) {
  return (
    <div className="ScoreBoard">
      Current Score: {score}
    </div>
  );
}

export default ScoreBoard;
