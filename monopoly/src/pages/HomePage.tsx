import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={Styles["content-box"]}>
      <h1>Monopoly Game</h1>
      <div className={Styles["btn"]}>
        <Link style={{color: "black"}} to="/game">Start Game</Link>
      </div>
    </div>
  );
}

export default HomePage;