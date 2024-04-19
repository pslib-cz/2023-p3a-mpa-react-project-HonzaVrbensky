import { Player } from "./Player";

export interface GameBoard {
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
    GO_TO_JAIL = "GO_TO_JAIL",
    RAILROAD = "RAILROAD",
    ELECTRIC_COMPANY = "ELECTRIC_COMPANY",
    WATER_WORKS = "WATER_WORKS"
}

export interface Property {
    type: SpaceType.PROPERTY;
    id: number;
    monopolyId: number;
    name: string;
    price: number;
    rent: number;
    owner?: number;
}

export interface Chance {
    name: string;
    type: SpaceType.CHANCE;
    id: number;
    text: string;
}

export interface CommunityChest {
    name: string;
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

export interface GO_TO_JAIL {
    type: SpaceType.GO_TO_JAIL;
    id: number;
    name: string;
}

export interface Railroad {
    type: SpaceType.RAILROAD;
    id: number;
    monopolyId: number;
    name: string;
    price: number;
    rent: number;
    owner?: number;
}

export interface ElectricCompany { 
    type: SpaceType.ELECTRIC_COMPANY;
    id: number;
    name: string;
    price: number;
    rent: number;
    owner?: number;

};

export interface WaterWorks {
    type: SpaceType.WATER_WORKS;
    id: number;
    name: string;
    price: number;
    rent: number;
    owner?: number;
}

export type Space = Property | Chance | CommunityChest | Go | Jail | FreeParking | Tax | GO_TO_JAIL | Railroad | ElectricCompany | WaterWorks;


export default GameBoard;