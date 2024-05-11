import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
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
    message: "Start game by rolling the dice.",
    gameOver: false,
    players: [{ id: 0, position: 0, name: "Player 1", money: 1500, round: 0, color: "Red"}, 
              { id: 1, position: 0, name: "Player 2", money: 1500, round: 0, color: "Blue"}, 
              { id: 2, position: 0, name: "Player 3", money: 1500, round: 0, color: "Green"}, 
              { id: 3, position: 0, name: "Player 4", money: 1500, round: 0, color: "Orange"},],
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
} | {
    type: 'LOAD_GAME';
    gameState: GameState;
} | {
    type: 'NEW_GAME';
}

 const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    
    switch(action.type) {
        case 'DICEROLL': {
            const currentPlayerIndex = newState.currentPlayerIndex;
            const currentPlayer = newState.players[currentPlayerIndex];
            console.log(`${currentPlayer.color} rolled the dice.`);
            newState.message = `${currentPlayer.color} rolled the dice.`;
        
            if (currentPlayer.round === newState.currentRound) {
                console.log("You have already rolled the dice in this round.");
                newState.message = "You have already rolled the dice in this round.";
                return newState;
            }
        
            const diceroll = Math.floor(Math.random() * 6) + 1;
            const newPosition = (currentPlayer.position + diceroll) % newState.gameBoard.spaces.length;
            const rentProperty = newState.gameBoard.spaces.find(space => space.id === newPosition) as Property | WaterWorks | ElectricCompany | Railroad;
        
            // Go to jail
            if (newPosition === 30) {
                currentPlayer.position = 10;
                currentPlayer.round = newState.currentRound;
                newState.message = "You go to Jail!";
                return newState;
            }
        
            // Jail
            if (currentPlayer.position === 10) {
                if (!!(diceroll & 1)) {
                    currentPlayer.position = newPosition;
                }
                currentPlayer.round = newState.currentRound;
                newState.message = "You are in Jail!";
                return newState;
            }
        
            // Income tax
            if (newPosition === 4) {
                currentPlayer.position = newPosition;
                currentPlayer.money -= 200;
                console.log("You paid $200 for income tax");

                newState.message = "You paid $200 for income tax";
                currentPlayer.round = newState.currentRound;
                return newState;
            }
        
            // Super tax
            if (newPosition === 38) {
                currentPlayer.position = newPosition;
                currentPlayer.money -= 300;
                console.log("You paid $300 for super tax");

                newState.message = "You paid $300 for super tax";
                currentPlayer.round = newState.currentRound;
                return newState;
            }

            // Rent
            if (rentProperty && rentProperty.owner !== currentPlayer.id) {
                const owner = newState.players.find(player => player.id === rentProperty.owner);
                if (owner) {
                    const rentAmount = rentProperty.rent;
                    currentPlayer.money -= rentAmount;
                    owner.money += rentAmount;
                    console.log(`${currentPlayer.color} paid ${rentAmount} to ${owner.color}`);
                    newState.message = `${currentPlayer.color} paid ${rentAmount} to ${owner.color}`;
                }
            }
        
            currentPlayer.position = newPosition;
            currentPlayer.round = newState.currentRound;
            return newState;
        }
            
        case 'BUY_PROPERTY': {
            const currentPlayer = newState.players[newState.currentPlayerIndex];
            const propertyToBuy = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property | WaterWorks | ElectricCompany | Railroad;

            if (propertyToBuy) {
                if (!propertyToBuy.owner) {
                    if (currentPlayer.money >= propertyToBuy.price) {
                        propertyToBuy.owner = currentPlayer.id;
                        currentPlayer.money -= propertyToBuy.price;
                        propertyToBuy.owner_color = currentPlayer.color;
                        newState.message = `${currentPlayer.color} bought ${propertyToBuy.name}`;
                    } else {
                        console.log("You don't have enough money to buy this property.");
                        newState.message = "You don't have enough money to buy this property.";
                    }
                } else {
                    console.log("This property is already owned.");
                    newState.message = "This property is already owned.";
                }
            }
            return newState;
        }

        case 'UPGRADE_PROPERTY': { 
            const currentPlayer = newState.players[newState.currentPlayerIndex];
            const propertyToUpgrade = newState.gameBoard.spaces.find(space => space.id === action.property.id) as Property;
            if (propertyToUpgrade) {
                if (propertyToUpgrade.owner === currentPlayer.id) {
                    if (currentPlayer.money >= propertyToUpgrade.price) {
                        if (propertyToUpgrade.upgrades < 4) {
                            propertyToUpgrade.rent *= 2;
                            currentPlayer.money -= propertyToUpgrade.price;
                            propertyToUpgrade.upgrades++;
                            newState.message = `${currentPlayer.color} upgraded ${propertyToUpgrade.name}`;
                        } else {
                            console.log("This property has reached its maximum upgrade limit.");
                        }
                    } else {
                        console.log("You don't have enough money to upgrade this property.");
                    }
                } else {
                    console.log("You do not own this property.");
                }
            }
            return newState;
        }

        case 'END_TURN':

        const currentPlayerIndex = newState.currentPlayerIndex;
        const currentPlayer = newState.players[currentPlayerIndex];

            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            if (newState.currentPlayerIndex === 0) {
                newState.currentRound++;
            }

            // Remove player if they have no money
            if (newState.players[currentPlayerIndex].money <= 0) {
                newState.players.splice(currentPlayerIndex, 1);
                if (newState.currentPlayerIndex >= newState.players.length) {
                    newState.currentPlayerIndex = 0; // Reset to first player if last player was removed
                }
                console.log(`${action.player.name} has been removed from the game.`);
                newState.message = `${currentPlayer.color} has been removed from the game.`;
                return newState;
            }

            // Win
            const remainingPlayers = newState.players.filter(player => player.money >= 0);
            if (remainingPlayers.length === 1) {
                newState.gameOver = true;
                console.log(`${remainingPlayers[0].color} has won the game!`);
            } else {
                console.log("The game cannot be won yet. Multiple players are still in the game.");
            }

            return newState;

        case 'LOAD_GAME':
            return action.gameState;

        case 'NEW_GAME':
            console.log("New game started.");
            return initialState;
        default:
            return state;
    }
 }

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const gameState = localStorage.getItem('gameState');
        if (gameState) {
            const parsedGameState = JSON.parse(gameState);
            if ((parsedGameState.currentRound === initialState.currentRound && parsedGameState.currentPlayerIndex !== initialState.currentPlayerIndex) || parsedGameState.currentRound !== initialState.currentRound) {
                dispatch({ type: 'LOAD_GAME', gameState: parsedGameState });
            }
        }
     }, []);
     
     useEffect(() => {
       localStorage.setItem('gameState', JSON.stringify(state)); 
     }, [state]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;