import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GameProvider, { GameContext } from './../../types/GameProvider';
import Styles from './GameBoardPage.module.css';

const GameBoardPage: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const handleDiceRoll = () => {
    dispatch({ type: 'DICEROLL' });
  };

  const handleEndTurn = () => {
    dispatch({ type: 'END_TURN' });
  };

  const handleBuyProperty = () => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentSpace = state.gameBoard.spaces[currentPlayer.position];

    // Check if the current space is a property, railroad, electric company, or water works
    if (
      currentSpace.type === 'PROPERTY' ||
      currentSpace.type === 'RAILROAD' ||
      currentSpace.type === 'ELECTRIC_COMPANY' ||
      currentSpace.type === 'WATER_WORKS'
    ) {
      dispatch({ type: 'BUY_PROPERTY', player: currentPlayer, property: currentSpace });
    } else {
      // Handle if the current space is not a property
      console.log("You can't buy this space.");
    }
  };

  return (
    <div>
      <h1>Monopoly Game Board</h1>
      <button onClick={handleDiceRoll}>Roll Dice</button>
      <button onClick={handleBuyProperty}>Buy Property</button>
      <button onClick={handleEndTurn}>End Turn</button>
      <pre>{JSON.stringify(state.currentRound)}</pre>
      <pre>{JSON.stringify(state.players, null, 2)}</pre>
      {state.gameBoard.spaces.map((space, index) => (
        <div key={index}>
          <h2>{space.name}</h2>
        </div>
      ))}

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default GameBoardPage;