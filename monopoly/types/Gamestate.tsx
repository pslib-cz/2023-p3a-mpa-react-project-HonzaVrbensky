import { Player } from "./Player";
import { Property } from "./GameBoard";
import { CommunityChest } from "./GameBoard";
import { Chance } from "./GameBoard";


interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    properties: Property[];
    cards: CommunityChest[] | Chance[];
  }