import React, { useState } from 'react';
import info from '../icons/info.svg'
import sitrus from '../icons/sitrusberry.png';
import './styles/Header.css';

function Header() {
  const [infoClicked, setInfoClicked] = useState(false);

  

  return (
    <div className="Header">
      <div className="logo-wrapper">
        <img className="logo" alt="logo" src={sitrus} />
        <div className="header-title">Memory Card Game</div>
      </div>
      <div className="button-wrapper">
        <img className="info-button" alt="info button" src={info} onClick={() => {setInfoClicked(!infoClicked)}}/>
        {
          (infoClicked) ?
            <div className='info'>
              This is a game to test your memory! You can only click each berry once, and once you clicked all possible berries, you progress
              to the next stage. As you progress through the stages, clicking on your previous choices will result in a game over! Good luck
              and have fun! 
            </div>
          :
            null
        }
      </div>
    </div>
  );
}

export default Header;
