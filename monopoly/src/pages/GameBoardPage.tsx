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
    dispatch({ type: 'END_TURN', player: state.players[state.currentPlayerIndex]});
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
      (currentSpace.type === 'PROPERTY' ||
      currentSpace.type === 'RAILROAD' ||
      currentSpace.type === 'ELECTRIC_COMPANY' ||
      currentSpace.type === 'WATER_WORKS') &&
      currentSpace.owner === undefined // Check if the property is not already owned
    ) {
      dispatch({ type: 'BUY_PROPERTY', player: currentPlayer, property: currentSpace });
    } else {
      console.log("You can't buy this space or it's already owned.");
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
    <div style={{ display: "flex", marginLeft: "-13rem"}}>
      <div style={{display: "flex", flexDirection: "column", gap: "5px", marginTop: "3rem", minWidth: "103px"}}>
        <button style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}} onClick={handleDiceRoll}>Roll Dice</button>
        {isPurchasable && currentPlayer.money > currentSpace.price && <button onClick={handleBuyProperty} style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}}>Buy Property</button>}
        {isPurchasable && isUpgradable && currentSpace.owner == currentPlayer.id &&  (<button onClick={handleUpgradeProperty} style={{backgroundColor: currentPlayer.color, color: 'black', marginRight: "3px"}}>Upgrade Property</button>)}
        <button onClick={handleEndTurn} style={{backgroundColor: currentPlayer.color, color: 'black'}}>End Turn</button>
        <Link to="/">Back to Home</Link>
      </div>
      {/*<pre>{JSON.stringify(state.currentRound)}</pre>
      <pre>{JSON.stringify(state.players, null, 2)}</pre>*/}

<div style={{position: "absolute", display: "flex", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {state.players.map((player, index) => (
          <div key={index} style={{backgroundColor: player.color, padding: '10px', margin: '10px'}}>
            <p style={{fontSize: "16px", fontWeight: "bold"}}>Player {player.color}</p>
            <p style={{fontSize: "16px", fontWeight: "bold"}}>Money: {player.money}</p>
            <p style={{fontSize: "16px", fontWeight: "bold"}}>Position: {player.position}</p>
            <p style={{fontSize: "16px", fontWeight: "bold"}}>Round: {player.round}</p>
          </div>
        ))}
      </div>

      <div className={Styles["gameboard"]}>

        {state.gameBoard.spaces.map((space, index) => (

          <div className={Styles["space"]} key={index}>

            <div>
              <p className={Styles["bold-text"]}>{space.id}</p>
              <p className={Styles["bold-text"]}>{space.name}</p>
            </div>

          <div style={{display: "flex"}}>
            {state.players.map((player, playerIndex) => (
              player.position === index && (
                <div
                  key={playerIndex}
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: player.color,
                    border: "1px solid black" // Assuming players have a color property
                  }}
                ></div>
              )
            ))}
            </div>

            {space.type === 'RAILROAD' && (
              <div className={Styles["info-container"]}>
                <div>
                  <p className={Styles["bold-text"]}>Price: {space.price}</p>
                  {<p>Owner: {space.owner_color}</p>}
                </div>
                <div>
                  <p>Tax: {space.rent}</p>
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
                   <p>Tax: {space.rent}</p>
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
                <p>Tax: {space.rent}</p>
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
                <p>Tax: {space.rent}</p>
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