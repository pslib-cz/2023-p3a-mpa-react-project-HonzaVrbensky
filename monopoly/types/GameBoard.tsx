import { Player } from "./Player";

interface GameBoard {
    spaces: Space[];
}

export enum SpaceType {
    PROPERTY = "PROPERTY",
    CHANCE = "CHANCE",
    COMMUNITY_CHEST = "COMMUNITY_CHEST",
    GO = "GO",
    JAIL = "JAIL",
    FREE_PARKING = "FREE_PARKING",
    TAX = "TAX",
}

export interface Property {
    type: SpaceType.PROPERTY;
    id: number;
    monopolyId: number;
    name: string;
    price: number;
    rent: number;
    owner?: Player;
}

export interface Chance {
    type: SpaceType.CHANCE;
    id: number;
    text: string;
}

export interface CommunityChest {
    type: SpaceType.COMMUNITY_CHEST;
    id: number;
    text: string;
}

export interface Go {
    type: SpaceType.GO;
    id: number;
    name: string;
}

export interface Jail {
    type: SpaceType.JAIL;
    id: number;
    name: string;
}

export interface FreeParking {
    type: SpaceType.FREE_PARKING;
    id: number;
    name: string;
}

export interface Tax {
    type: SpaceType.TAX;
    id: number;
    name: string;
    amount: number;
}
export type Space = Property | Chance | CommunityChest | Go | Jail | FreeParking | Tax;


export default GameBoard;