// GameBoardPage.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './../../types/GameProvider';
import Styles from './GameBoardPage.module.css';

const GameBoardPage: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const handleDiceRoll = () => {
    dispatch({ type: 'DICEROLL', player: state.players[state.currentPlayerIndex]});
  };

  const handleEndTurn = () => {
    dispatch({ type: 'END_TURN' });
  };

  const handleBuyProperty = () => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentSpace = state.gameBoard.spaces[currentPlayer.position];

    if (
      currentSpace.type === 'PROPERTY' ||
      currentSpace.type === 'RAILROAD' ||
      currentSpace.type === 'ELECTRIC_COMPANY' ||
      currentSpace.type === 'WATER_WORKS'
    ) {
      dispatch({ type: 'BUY_PROPERTY', player: currentPlayer, property: currentSpace });
    } else {
      console.log("You can't buy this space.");
    }
  };

  return (
    <div>
      <h1>Monopoly Game Board</h1>
      <div className={Styles["gameboard"]}>
        {state.gameBoard.spaces.map((space, index) => (
          <div className={Styles["space"]} key={index}>
            <p>{space.name}</p>
            <p>{space.id}</p>
            <p>{space.type}</p>
            {space.type === 'RAILROAD' && (
              <div>
                <p>Price: {space.price}</p>
                <p>Owner: {space.owner}</p>
              </div>
            )}
            {space.type === 'ELECTRIC_COMPANY' && (
              <div>
                <p>Price: {space.price}</p>
                <p>Owner: {space.owner}</p>
              </div>
            )}
            {space.type === 'WATER_WORKS' && (
              <div>
                <p>Price: {space.price}</p>
                <p>Owner: {space.owner}</p>
              </div>
            )}
            {space.type === 'PROPERTY' && (
              <div>
                <p>Price: {space.price}</p>
                <p>Owner: {space.owner}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleDiceRoll}>Roll Dice</button>
      <button onClick={handleBuyProperty}>Buy Property</button>
      <button onClick={handleEndTurn}>End Turn</button>
      <pre>{JSON.stringify(state.currentRound)}</pre>
      <pre>{JSON.stringify(state.players, null, 2)}</pre>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default GameBoardPage;
