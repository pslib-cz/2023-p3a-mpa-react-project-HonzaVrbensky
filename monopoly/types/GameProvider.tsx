import react, { PropsWithChildren, createContext, useContext, useReducer, useState } from 'react';
import { Space } from './GameBoard';
import { GameState } from './GameState';
import { Player } from './Player';
import { GameBoard } from './GameBoard';
import { properties, chances, communityChests, jail, goToJail, freeParking, waterWorks, electricCompany, railroads, tax, go  } from './data/Spaces';

interface IGameContext {
    state: GameState;
    dispatch: (state: GameState) => void; 
}

const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [],
    currentPlayerIndex: 0,
    gameBoard: {
        spaces: [
            go,
            ...properties,
            ...chances,
            ...communityChests,
            jail,
            ...railroads,
            electricCompany,
            ...tax,
            goToJail,
            ...railroads,
            waterWorks,
            ...properties,
            freeParking,
            ...railroads,
            ...chances,
            ...communityChests,
            ...properties
        ].sort((a, b) => a.id - b.id)
    }
 }

type Action = { 
    type: 'ADD_PLAYER';
    player: Player;
} | {
    type: 'ROLL_DICE';
} | {
    type: 'BUY_PROPERTY';
    player: Player;
    property: Space;
} | {
    type: 'PAY_RENT';
    player: Player;
    property: Space;
} |{
    type: 'WIN_GAME';
    player: Player;
} | {
    type: 'PLAYER_MOVEMENT';
};

 const reducer = (state: GameState, action: GameState): GameState => {
     return state;
 }

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
//    const [state, setState] = useState({ players: [], currentPlayer: 0 });
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;