import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './../../types/GameProvider';
import Styles from './GameBoardPage.module.css';
import Styles2 from './HomePage.module.css';

const GameBoardPage: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const handleDiceRoll = () => {
    dispatch({ type: 'DICEROLL', player: state.players[state.currentPlayerIndex]});
  };

  const handleEndTurn = () => {
    dispatch({ type: 'END_TURN', player: state.players[state.currentPlayerIndex]});
  };

  const handleNewGame = () => {
    dispatch({ type: 'NEW_GAME' });
  };

  const handleUpgradeProperty = () => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    const currentSpace = state.gameBoard.spaces[currentPlayer.position];

    if (
      currentSpace.type === 'PROPERTY'

    ) {
      dispatch({ type: 'UPGRADE_PROPERTY', player: {...currentPlayer}, property: {...currentSpace} });
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
      dispatch({ type: 'BUY_PROPERTY', player: {...currentPlayer}, property: {...currentSpace}});
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

if (state.gameOver) { 
  return (
    <div className={Styles2["content-box"]}>
      <h1 className={Styles2["warning-text"]}>Game Over!</h1>
      <p style={{fontSize: "23px"}}>{currentPlayer.color} wins!</p>
      <div className={Styles["flexed-items"]}>
        <button onClick={handleNewGame}>New Game</button>
        <div className={Styles2["btn--small"]}>
          <Link style={{color: "black"}} to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );

}

  return (
    <div className={Styles["page-box"]}>

      <div className={Styles["button-box"]}>
        <button style={{backgroundColor: currentPlayer.color, color: 'black', minWidth: "103px"}} onClick={handleDiceRoll}>Roll Dice</button>
        {isPurchasable && currentPlayer.money > currentSpace.price && currentSpace.owner == undefined && <button onClick={handleBuyProperty} style={{backgroundColor: currentPlayer.color, color: 'black', minWidth: "103px"}}>Buy Property</button>}
        {isPurchasable && isUpgradable && currentSpace.owner == currentPlayer.id && currentSpace.upgrades < 4 &&  (<button onClick={handleUpgradeProperty} style={{backgroundColor: currentPlayer.color, color: 'black', minWidth: "103px"}}>Upgrade Property</button>)}
        <button onClick={handleEndTurn} style={{backgroundColor: currentPlayer.color, color: 'black'}}>End Turn</button>
       { <button onClick={handleNewGame} style={{backgroundColor: "grey", color: 'black', marginTop: "5px"}}>New Game</button>}
        <div className={Styles2["btn--small"]}>
          <Link style={{color: "black"}} to="/">Back to Home</Link>
        </div>
      </div>

<div className={Styles["player-info--box"]}>
        {state.players.map((player, index) => (
          <div key={index} style={{backgroundColor: player.color, padding: '10px', margin: '10px', borderRadius: "0.5rem", border: "1px solid black"}}>
            <p className={Styles["player-info--text"]}>Player: {player.color}</p>
            <p className={Styles["player-info--text"]}>Money: {player.money}</p>
            <p className={Styles["player-info--text"]}>Position: {player.position}</p>
            <p className={Styles["player-info--text"]}>Round: {player.round}</p>
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