import { Property } from "./GameBoard";

export interface Player {
    id: number;
    position: number;
    name: string;
    money: number;
    properties: Property[];
    round: number;
  }