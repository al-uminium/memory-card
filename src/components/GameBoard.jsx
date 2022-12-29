import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid'
import Card from './Card';
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

  const getBerryArray = (num = 40) => {
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
    if (selectedBerries.includes(selectedBerry)) {
      gameOver();
    } else {
      const updatedBerryArr = selectedBerries.concat(selectedBerry);
      setSelectedBerries(updatedBerryArr);
      shuffleCards();
    }
  }

  const gameOver = () => {
    // placeholder function
    console.log("Game Over weee")
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


  return (
    <div className="GameBoard">
      <StageBoard />
      <div className="card-board">
        {loadState==='loaded'? currentStageBerries.map((sprite) => 
          <Card
            key={sprite.id} 
            url={sprite.url} 
            id={sprite.id} 
            playerChoice={playerChoice} />) 
          : 
          null
        }
      </div>
      <ScoreBoard />
    </div>
  );
}

export default GameBoard;
