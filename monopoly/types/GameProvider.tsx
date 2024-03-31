import react, { PropsWithChildren, createContext, useReducer } from 'react';
import { GameState } from './GameState';
import { Player } from './Player';
import { properties, chances, communityChests, jail, goToJail, freeParking, waterWorks, electricCompany, railroads, tax, go  } from './data/Spaces';
import { Property  } from './GameBoard';

interface IGameContext {
    state: GameState;
    dispatch: (action: Action) => void; 
}

const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [{ id: 0, position: 0, name: "Player 1", money: 1500, properties: [] }, 
              { id: 1, position: 0, name: "Player 2", money: 1500, properties: [] }, 
              { id: 2, position: 0, name: "Player 3", money: 1500, properties: [] }, 
              { id: 3, position: 0, name: "Player 4", money: 1500, properties: [] },],
    currentPlayerIndex: 0,
    gameBoard: {
        spaces: [
            go,
            ...properties,
            ...chances,
            ...communityChests,
            ...railroads,
            ...tax,
            jail,
            goToJail,
            electricCompany,
            waterWorks,
            freeParking
        ].sort((a, b) => a.id - b.id)
    }
 }

type Action = { 
    type: 'DICEROLL';
} | {
    type: 'BUY_PROPERTY';
    player: Player;
    property: Property;
} | {
    type: 'PAY_RENT';
    player: Player;
    property: Property;
} |{
    type: 'WIN_GAME';
    player: Player;
} | {
    type: 'PLAYER_MOVEMENT';
};

 const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    
    switch(action.type) {
        case 'DICEROLL':
            const diceroll = Math.floor(Math.random() * 6) + 1;
            const currentPlayer = newState.players[newState.currentPlayerIndex+diceroll] || newState.players[diceroll];
            return newState;
        case 'BUY_PROPERTY':
            const property = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property;
            if (property) {
                property.owner = action.player;
                action.player.money -= property.price;    
            }
            return newState;
        case 'PAY_RENT':
            const rentProperty = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property;
            if (rentProperty) {
                action.player.money -= rentProperty.rent;
                rentProperty.owner!.money += rentProperty.rent;
            }
            return newState;
        case 'WIN_GAME':
            return newState;
        case 'PLAYER_MOVEMENT':
            return newState;
        default:
            return state;
    }
 }

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
//    const [state, setState] = useState({ players: [], currentPlayer: 0 });
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(initialState);
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;