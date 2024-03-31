import { Player } from "./Player";
import GameBoard from "./GameBoard";

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  gameBoard: GameBoard;
}