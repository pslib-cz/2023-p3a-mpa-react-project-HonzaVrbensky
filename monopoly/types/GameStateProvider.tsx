import react, { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Space } from './GameBoard';

interface GameState {
    players: string[];
    currentPlayer: number;
}

interface GameBoard {
    spaces: Space[];
}

interface Player {
    id: number;
    name: string;
    money: number;
    properties: Space[];
 }

export const GameStateContext: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState({ players: [], currentPlayer: 0 });

    return (
        <GameStateContext.Provider value={{ state, setState }}>
            {children}
        </GameStateContext.Provider>
    );
}
export default GameStateContext;