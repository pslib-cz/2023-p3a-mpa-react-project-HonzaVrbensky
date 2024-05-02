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
    players: [{ id: 0, position: 0, name: "Player 1", money: 100, round: 0, color: "red"}, 
              { id: 1, position: 0, name: "Player 2", money: 100, round: 0, color: "blue"}, 
              { id: 2, position: 0, name: "Player 3", money: 100, round: 0, color: "green"}, 
              { id: 3, position: 0, name: "Player 4", money: 100, round: 0, color: "orange"},],
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
    player: Player;
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
    player: Player;
}  | {
    type: 'UPGRADE_PROPERTY';
    player: Player;
    property: Property | WaterWorks | ElectricCompany | Railroad;
};

 const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    
    switch(action.type) {
        case 'DICEROLL': {
            if (newState.players[newState.currentPlayerIndex].round === newState.currentRound) {
                console.log("You have already rolled the dice in this round.");
                return newState;
            }
        
            

            const diceroll = Math.floor(Math.random() * 6) + 1;
            const currentPlayerIndex = newState.currentPlayerIndex;
            const newPosition = (newState.players[currentPlayerIndex].position + diceroll) % newState.gameBoard.spaces.length;
            newState.players[currentPlayerIndex].position = newPosition;
            const rentProperty = newState.gameBoard.spaces.find(space => space.id === newPosition) as Property | WaterWorks | ElectricCompany | Railroad;

            if (newState.players[currentPlayerIndex].money <= 0) {
                newState.players.splice(currentPlayerIndex, 1);
                if (newState.currentPlayerIndex >= newState.players.length) {
                    newState.currentPlayerIndex = 0; // Reset to first player if last player was removed
                }
                console.log(`${action.player.name} has been removed from the game.`);
                return newState;
            }

            //rent
            if (rentProperty && rentProperty.owner) {
                const owner = newState.players.find(player => player.id === rentProperty.owner);
        
                // If owner exists and is not the current player, transfer rent
                if (owner && owner.id !== action.player.id) {
                    action.player.money -= rentProperty.rent;
                    owner.money += rentProperty.rent;
                    console.log(`${action.player.name} paid ${rentProperty.rent} to ${owner.name}`);
                }
            }
            newState.players[currentPlayerIndex].round = newState.currentRound;
            return newState;
        }
            
        case 'BUY_PROPERTY': {
            const propertyToBuy = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property | WaterWorks | ElectricCompany | Railroad;
            if (propertyToBuy) {
                if (!propertyToBuy.owner) {
                    propertyToBuy.owner = action.player.id;
                    action.player.money -= propertyToBuy.price;
                    propertyToBuy.owner_color = action.player.color;
                } else {
                    console.log("This property is already owned.");
                }
            }
            return newState;
        }
        case 'UPGRADE_PROPERTY': { 
            const propertyToUpgrade = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property;
            if (propertyToUpgrade) {
                if (propertyToUpgrade.owner === action.player.id) {
                    if (propertyToUpgrade.upgrades < 4) { // Check if property can be upgraded
                        propertyToUpgrade.rent *= 2;
                        action.player.money -= propertyToUpgrade.price;
                        propertyToUpgrade.upgrades++; // Increment upgrade count
                    } else {
                        console.log("This property has reached its maximum upgrade limit.");
                    }
                } else {
                    console.log("You do not own this property.");
                }
            }
            return newState;
        }
        case 'END_TURN':

        const currentPlayerIndex = newState.currentPlayerIndex;
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            if (newState.currentPlayerIndex === 0) {
                newState.currentRound++;
            }

            if (newState.players[currentPlayerIndex].money <= 0) {
                newState.players.splice(currentPlayerIndex, 1);
                if (newState.currentPlayerIndex >= newState.players.length) {
                    newState.currentPlayerIndex = 0; // Reset to first player if last player was removed
                }
                console.log(`${action.player.name} has been removed from the game.`);
                return newState;
            }

            const remainingPlayers = newState.players.filter(player => player.money >= 0);
            if (remainingPlayers.length === 1) {
                console.log(`${remainingPlayers[0].name} has won the game!`);
            } else {
                console.log("The game cannot be won yet. Multiple players are still in the game.");
            }

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