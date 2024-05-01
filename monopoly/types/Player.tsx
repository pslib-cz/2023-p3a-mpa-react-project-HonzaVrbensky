import { Property } from "./GameBoard";

export interface Player {
    id: number;
    position: number;
    name: string;
    money: number;
    round: number;
    color: string;
  }