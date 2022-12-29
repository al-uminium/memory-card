import React from 'react';

const GameOver = ({ bestScore, score }) => {
  const consolingMessage = () => {
    const delta = bestScore - score;
    if (delta > 1 && delta < 3) {
      return "You almost beat your high score! You can do it!"
    } else if (delta >= 3) {
      return "You can beat your high score, believe in yourself!"
    }
  }

  return (
    <div>
      <div>Oh noo... You've already picked this berry before.</div>
      <div>Your best score is {bestScore}, and your current score is {score}</div>
      <div>{consolingMessage()}</div>
    </div>
  );
}

export default GameOver;
