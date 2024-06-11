import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './HomePage.module.css';

const TutorialPage: React.FC = () => {
  return (
    <div className={Styles["content-box"]}>
      <h1>Monopoly Game</h1>
      <p style={{fontSize: "16px"}}>
        This is a game of Monopoly. The goal of the game is to bankrupt your opponents by buying and upgrading properties.

        Each player starts the game with a certain amount of money. Players take turns rolling the dice and moving around the board.

        When a player lands on a property, they have the option to buy it if it's not already owned. If the property is owned by another player, they must pay tax.

        Players can also upgrade their properties to increase the rent that other players must pay and making their odds for winning bigger.
      </p>
      <div className={Styles["btn"]}>
        <Link style={{color: "black"}} to="/game">Start Game</Link>
      </div>
      <div className={Styles["btn"]}>
      <Link style={{color: "black"}} to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default TutorialPage;