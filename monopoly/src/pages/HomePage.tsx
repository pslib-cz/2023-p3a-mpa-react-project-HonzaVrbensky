import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Monopoly Game</h1>
      <p>Welcome to Monopoly!</p>
      <Link to="/game">Start Game</Link>
    </div>
  );
}

export default HomePage;