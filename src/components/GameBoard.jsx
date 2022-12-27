import React from 'react';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import StageBoard from './StageBoard';
import './styles/GameBoard.css'

const GameBoard = () => {
    return (
        <div className='GameBoard'>
            <StageBoard />
            <div className='card-board'>
                <Card />
                <Card />
                <Card />
                <Card />
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
            </div>
            <ScoreBoard />
        </div>
    );
}

export default GameBoard;
