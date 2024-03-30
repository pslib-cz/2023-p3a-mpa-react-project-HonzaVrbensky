import { Property } from "./GameBoard";

export interface Player {
    id: number;
    name: string;
    money: number;
    properties: Property[];
  }