import React, { useState, useEffect } from 'react';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import StageBoard from './StageBoard';
import './styles/GameBoard.css';

function GameBoard() {
  const [berrySpriteURLs, setBerrySpriteURLs] = useState([]);
  const [loadState, setLoadingState] = useState('');
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
          berrySpriteURL.push(obj.sprites.default);
        });
        setBerrySpriteURLs(berrySpriteURL);
        setLoadingState('loaded');
      } catch (e) {
        console.log(e.toString());
      }
    };

    getBerryURLs();
  },[])

  return (
    <div className="GameBoard">
      <StageBoard />
      <div className="card-board">
        {loadState==='loaded'? berrySpriteURLs.slice(0, stage*4).map((url) => <Card url={url} />) : null}
      </div>
      <ScoreBoard />
    </div>
  );
}

export default GameBoard;
