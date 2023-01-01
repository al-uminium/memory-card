import React from 'react';
import './styles/GameOver.css'

const GameOver = ({ bestScore, score, restartGame, gameWon }) => {

  const consolingMessage = () => {
    const delta = bestScore - score;
    if (delta >= 1 && delta <= 2) {
      return "You almost beat your high score! You can do it!"
    } else if (delta >= 3) {
      return "You can beat your high score, believe in yourself!"
    } else if (delta === 0) {
      return "You beat your high score!"
    }
  }

  return (
    <div className='gameover-wrapper'>
      {gameWon ? 
        <>
          <div className='gameover-default-message'>Congratulations! You've beat the game! 🎉
            <button className='gameover-button' type='button' onClick={restartGame}>Would you like to play again?</button>
          </div>
        </>
        :
        <>
          <div className='gameover-default-message'>Oh noo... You've already picked this berry before.</div>
          <div className='gameover-score'>Your best score is {bestScore}, and your current score is {score}.</div>
          <div className='gameover-consolingmessage'>{consolingMessage()}</div>
          <div>
            <button className='gameover-button' type='button' onClick={restartGame}>Try again?</button>
          </div>
        </>
      }
    </div>
  );
}

export default GameOver;
