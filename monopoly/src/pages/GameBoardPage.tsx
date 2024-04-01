import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GameContext } from './../../types/GameProvider.tsx';

const GameBoardPage: React.FC = () => {
  const gameContext = useContext(GameContext);
  return (
    <div>
      <h1>Monopoly Game Board</h1>
      <button onClick={() => {}}>Diceroll</button>
      <Link to="/">Back to Home</Link>
      <p>{JSON.stringify(gameContext)}</p>
    </div>
  );
}

export default GameBoardPage;