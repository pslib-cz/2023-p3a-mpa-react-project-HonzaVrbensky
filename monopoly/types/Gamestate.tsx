import { Player } from "./Player";
import GameBoard from "./GameBoard";


interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    gameBoard: GameBoard;
  }