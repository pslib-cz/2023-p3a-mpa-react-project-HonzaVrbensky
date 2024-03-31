import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GameStateContext } from '../types/GameProvider';

const GameBoardPage: React.FC = () => {
  return (
    <div>
      <h1>Monopoly Game Board</h1>
      <button onClick={() => {}}>Diceroll</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default GameBoardPage;