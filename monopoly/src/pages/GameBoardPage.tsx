import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './../../types/GameProvider';
import Styles from './GameBoardPage.module.css';
import { Player } from '../../types/Player';
import { properties } from '../../types/data/Spaces';

const GameBoardPage: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const handleDiceRoll = () => {
    dispatch({ type: 'DICEROLL', player: state.players[state.currentPlayerIndex]});
  };

  const handleEndTurn = () => {
    dispatch({ type: 'END_TURN' });
  };

  const handleUpgradeProperty = () => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentSpace = state.gameBoard.spaces[currentPlayer.position];

    if (
      currentSpace.type === 'PROPERTY'

    ) {
      dispatch({ type: 'UPGRADE_PROPERTY', player: currentPlayer, property: currentSpace });
    } else {
      console.log("You can't upgrade this space.");
    }
  }

  const handleBuyProperty = () => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentSpace = state.gameBoard.spaces[currentPlayer.position];

    if (
      currentSpace.type === 'PROPERTY' ||
      currentSpace.type === 'RAILROAD' ||
      currentSpace.type === 'ELECTRIC_COMPANY' ||
      currentSpace.type === 'WATER_WORKS' && currentSpace.owner === undefined
    ) {
      dispatch({ type: 'BUY_PROPERTY', player: currentPlayer, property: currentSpace });
    } else {
      console.log("You can't buy this space.");
    }
  };

  const currentPlayer = state.players[state.currentPlayerIndex];
  const currentSpace = state.gameBoard.spaces[currentPlayer.position];
  const isPurchasable = (
    currentSpace.type === 'PROPERTY' ||
    currentSpace.type === 'RAILROAD' ||
    currentSpace.type === 'ELECTRIC_COMPANY' ||
    currentSpace.type === 'WATER_WORKS'
  );
  const isUpgradable = ( currentSpace.type === 'PROPERTY');

  return (
    <div style={{marginTop: "-2rem"}}>
      <div style={{position: "absolute", left: "8rem", top: "3rem", display: "flex", flexDirection: "column", gap: "5px"}}>
        <button style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}} onClick={handleDiceRoll}>Roll Dice</button>
        {isPurchasable && <button onClick={handleBuyProperty} style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}}>Buy Property</button>}
        {isPurchasable && isUpgradable && currentSpace.owner == currentPlayer.id &&  (<button onClick={handleUpgradeProperty} style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}}>Upgrade Property</button>)}
        <button onClick={handleEndTurn} style={{backgroundColor: currentPlayer.color, color: 'black'}}>End Turn</button>
        <Link to="/">Back to Home</Link>
      </div>
      {/*<pre>{JSON.stringify(state.currentRound)}</pre>
      <pre>{JSON.stringify(state.players, null, 2)}</pre>*/}

      <div className={Styles["gameboard"]}>
        {state.gameBoard.spaces.map((space, index) => (
          <div className={Styles["space"]} key={index}>

            <div>
              <p className={Styles["bold-text"]}>{space.id}</p>
              <p className={Styles["bold-text"]}>{space.name}</p>
            </div>

            {state.players.map((player, playerIndex) => (
              player.position === index && (
                <div
                  key={playerIndex}
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: player.color // Assuming players have a color property
                  }}
                ></div>
              )
            ))}

            {space.type === 'RAILROAD' && (
              <div className={Styles["info-container"]}>
                <div>
                  <p className={Styles["bold-text"]}>Price: {space.price}</p>
                  {<p>Owner: {space.owner_color}</p>}
                </div>
                <div>
                  <p>Rent: {space.rent}</p>
                  <p>Upgrades: {space.upgrades}</p>
                </div>
              </div>
            )}
            {space.type === 'ELECTRIC_COMPANY' && (
                 <div className={Styles["info-container"]}>
                 <div>
                   <p className={Styles["bold-text"]}>Price: {space.price}</p>
                   {<p>Owner: {space.owner_color}</p>}
                 </div>
                 <div>
                   <p>Rent: {space.rent}</p>
                   <p>Upgrades: {space.upgrades}</p>
                 </div>
               </div>
            )}
            {space.type === 'WATER_WORKS' && (
              <div className={Styles["info-container"]}>
              <div>
                <p className={Styles["bold-text"]}>Price: {space.price}</p>
                {<p>Owner: {space.owner_color}</p>}
              </div>
              <div>
                <p>Rent: {space.rent}</p>
                <p>Upgrades: {space.upgrades}</p>
              </div>
            </div>
            )}
            {space.type === 'PROPERTY' && (
              <div className={Styles["info-container"]}>
              <div>
                <p className={Styles["bold-text"]}>Price: {space.price}</p>
                {<p>Owner: {space.owner_color}</p>}
              </div>
              <div>
                <p>Rent: {space.rent}</p>
                <p>Upgrades: {space.upgrades}</p>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoardPage;