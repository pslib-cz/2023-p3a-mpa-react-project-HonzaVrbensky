import react, { PropsWithChildren, createContext, useReducer } from 'react';
import { GameState } from './GameState';
import { Player } from './Player';
import { properties, chances, communityChests, jail, goToJail, freeParking, waterWorks, electricCompany, railroads, tax, go  } from './data/Spaces';
import { ElectricCompany, Property, WaterWorks, Railroad  } from './GameBoard';

interface IGameContext {
    state: GameState;
    dispatch: (action: Action) => void; 
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [{ id: 0, position: 0, name: "Player 1", money: 1500, properties: [], round: 1}, 
              { id: 1, position: 0, name: "Player 2", money: 1500, properties: [], round: 1}, 
              { id: 2, position: 0, name: "Player 3", money: 1500, properties: [], round: 1}, 
              { id: 3, position: 0, name: "Player 4", money: 1500, properties: [], round: 1},],
    currentPlayerIndex: 0,
    currentRound: 1,
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
    property: Property | WaterWorks | ElectricCompany | Railroad;
} | {
    type: 'PAY_RENT';
    player: Player;
    property: Property | WaterWorks | ElectricCompany | Railroad;
} |{
    type: 'WIN_GAME';
    player: Player;
} | {
    type: 'PLAYER_MOVEMENT';
} | {
    type: 'END_TURN';
};

 const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    
    switch(action.type) {
        case 'DICEROLL':
           /* if (newState.players[newState.currentPlayerIndex].round !== newState.currentRound) {
                console.log("You have already rolled the dice in this round.");
                return newState;
            }*/
        
            const diceroll = Math.floor(Math.random() * 6) + 1;
            const currentPlayerIndex = newState.currentPlayerIndex;
            const newPosition = (newState.players[currentPlayerIndex].position + diceroll) % newState.gameBoard.spaces.length;
            newState.players[currentPlayerIndex].position = newPosition;
            return newState;
        case 'BUY_PROPERTY':
            const propertyToBuy = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property | WaterWorks | ElectricCompany | Railroad;
            if (propertyToBuy) {
                if (!propertyToBuy.owner) {
                    propertyToBuy.owner = action.player;
                    action.player.money -= propertyToBuy.price;
                } else {
                    console.log("This property is already owned.");
                }
            }
            return newState;
            case 'PAY_RENT':
                const rentProperty = newState.gameBoard.spaces.find(space => space.id === action.player.position) as Property | WaterWorks | ElectricCompany | Railroad;
                if (rentProperty && rentProperty.owner) {
                    if (rentProperty.id === action.player.id) {
                    action.player.money -= rentProperty.rent;
                    rentProperty.owner.money += rentProperty.rent;
                    console.log(`${action.player.name} paid ${rentProperty.rent} to ${rentProperty.owner.name}`);
                    }
                    /*
                    action.player.money -= rentProperty.rent;
                    rentProperty.owner.money += rentProperty.rent;
                    console.log(`${action.player.name} paid ${rentProperty.rent} to ${rentProperty.owner.name}`);*/
                }
            return newState;
        case 'WIN_GAME':
            return newState;
        case 'END_TURN':
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            return newState;
        default:
            return state;
    }
 }

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
//    const [state, setState] = useState({ players: [], currentPlayer: 0 });
    const [state, dispatch] = useReducer(reducer, initialState);
    //console.log(initialState);
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;