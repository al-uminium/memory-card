import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid'
import Card from './Card';
import GameOver from './GameOver';
import ScoreBoard from './ScoreBoard';
import StageBoard from './StageBoard';
import './styles/GameBoard.css';

function GameBoard() {
  const [berrySpriteURLs, setBerrySpriteURLs] = useState([]);
  const [loadState, setLoadingState] = useState('');
  const [currentStageBerries, setCurrentStageBerries] = useState([]);
  const [selectedBerries, setSelectedBerries] = useState([]);
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [isGameWon, setGameWon] = useState(false);

  const getBerryArray = (num = 20) => {
    // berry item no starts from 126, ends at 189.
    const max = 189;
    const min = 126;
    const berryArray = [];

    let i = 0;
    while (i < num) {
      const berryItemNo = Math.floor(Math.random() * (max - min) + min);
      if (!berryArray.includes(berryItemNo)) {
        berryArray.push(berryItemNo);
        i += 1;
      }
    }

    return berryArray;
  };

  const convertToURL = (arr) => {
    const urlArray = [];
    arr.forEach((no) => {
      urlArray.push(`https://pokeapi.co/api/v2/item/${no}`);
    });

    return urlArray;
  };

  const shuffleCards = () => {
    let currentIndex = currentStageBerries.length-1;
    let randomIndex;
    let shuffledArray = currentStageBerries;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * (currentIndex+1));
      console.log(`rand: ${randomIndex}, curr: ${currentIndex}`);
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
      console.log(shuffledArray)
      currentIndex -= 1;
    }
    setCurrentStageBerries(shuffledArray);
  }

  const playerChoice = (berry) => {
    const selectedBerry = berry.target.id;
    setTimeout(() => {
      if (selectedBerries.includes(selectedBerry)) {
        gameOver();
        return
      } else {
        const maxScore = 20;
        const updatedBerryArr = selectedBerries.concat(selectedBerry);
        setSelectedBerries(updatedBerryArr)
        const newScore = score+1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        setScore(newScore);
        if (score===maxScore) {
          setGameWon(true)
        }
      }
    },500)
    shuffleCards()
  }

  const gameOver = () => {
    console.log("Game Over");
    // setGameOver(true);
  }

  const gameWon = () => {
    setGameWon(true);
  }

  const restartGame = () => {
    setStage(1);
    setScore(0);
    setSelectedBerries([]);
    setGameOver(false);
    setGameWon(false);
  }

  useEffect(() => {
    const getBerryURLs = async () => {
      setLoadingState('loading');
      const berries = getBerryArray();
      const berriesURL = convertToURL(berries);
      try {
        const res = await Promise.all(berriesURL.map((url) => fetch(url)));
        const data = await Promise.all(res.map((d) => d.json()));
        const berrySpriteURL = [];
        data.forEach((obj) => {
          berrySpriteURL.push(
            {
              url:obj.sprites.default,
              id: uniqid(),
            }
          );
        });
        setBerrySpriteURLs(berrySpriteURL);
        setLoadingState('loaded');
      } catch (e) {
        setLoadingState('error');
        console.log(e.toString());
      }
    };
    getBerryURLs();
  },[])

  useEffect(() => {
    const getCurrentStageBerries = () => {
      const currentStageBerries = berrySpriteURLs.slice(0, stage*4);
      setCurrentStageBerries(currentStageBerries)
    }
    getCurrentStageBerries()
  }, [berrySpriteURLs,stage])

  // checks if score hits next stage.
  useEffect(() => {
    if (score===(stage*4)) {
      const nextStage = stage + 1;
      setStage(nextStage);
    }
  },[stage, score]);

  return (
    <div className="GameBoard">
      {isGameOver ? 
        <GameOver 
          score={score} 
          bestScore={bestScore}
          restartGame={restartGame}
          gameWon={isGameWon}
        />
      :
      (<>
        <StageBoard stage={stage} />
        <div className="card-board">
          {loadState === 'loaded' ? currentStageBerries.map((sprite) => <Card
            key={sprite.id}
            url={sprite.url}
            id={sprite.id}
            playerChoice={playerChoice} />)
            :
            null}
        </div>
        <ScoreBoard score={score} />
        </>
      )}
    </div>
  );
}

export default GameBoard;
