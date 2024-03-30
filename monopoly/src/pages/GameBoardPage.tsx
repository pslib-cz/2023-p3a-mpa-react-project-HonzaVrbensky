import React from 'react';
import { Link } from 'react-router-dom';

const GameBoardPage: React.FC = () => {
  return (
    <div>
      <h1>Monopoly Game Board</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default GameBoardPage;