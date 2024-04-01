import { SpaceType, Property, Chance, CommunityChest, Go, Jail, FreeParking, Tax, GO_TO_JAIL, Railroad, WaterWorks, ElectricCompany} from "../GameBoard";
import { Player } from "../Player";
import { ChanceCards } from "./Chance";
import { CommunityChests } from "./CommunityChests";

export const properties: Property[] = [
    {
        type: SpaceType.PROPERTY,
        id: 1,
        monopolyId: 1,
        name: "Old Kent Road",
        price: 60,
        rent: 2,
    },
    {
        type: SpaceType.PROPERTY,
        id: 3,
        monopolyId: 1,
        name: "Whitechapel Road",
        price: 60,
        rent: 4,
    },
    {
        type: SpaceType.PROPERTY,
        id: 6,
        monopolyId: 2,
        name: "The Angel Islington",
        price: 100,
        rent: 6,
    },
    {
        type: SpaceType.PROPERTY,
        id: 8,
        monopolyId: 2,
        name: "Euston Road",
        price: 100,
        rent: 6,
    },
    {
        type: SpaceType.PROPERTY,
        id: 9,
        monopolyId: 2,
        name: "Pentonville Road",
        price: 120,
        rent: 8,
    },
    {
        type: SpaceType.PROPERTY,
        id: 11,
        monopolyId: 3,
        name: "Pall Mall",
        price: 140,
        rent: 10,
    },
    {
        type: SpaceType.PROPERTY,
        id: 13,
        monopolyId: 3,
        name: "Whitehall",
        price: 140,
        rent: 10,
    },
    {
        type: SpaceType.PROPERTY,
        id: 14,
        monopolyId: 3,
        name: "Northumberland Avenue",
        price: 160,
        rent: 12,
    },
    {
        type: SpaceType.PROPERTY,
        id: 16,
        monopolyId: 4,
        name: "Bow Street",
        price: 180,
        rent: 14,
    },
    {
        type: SpaceType.PROPERTY,
        id: 18,
        monopolyId: 4,
        name: "Marlborough Street",
        price: 180,
        rent: 14,
    },
    {
        type: SpaceType.PROPERTY,
        id: 19,
        monopolyId: 4,
        name: "Vine Street",
        price: 200,
        rent: 16,
    },
    {
        type: SpaceType.PROPERTY,
        id: 21,
        monopolyId: 5,
        name: "Strand",
        price: 220,
        rent: 18,
    },
    {
        type: SpaceType.PROPERTY,
        id: 23,
        monopolyId: 5,
        name: "Fleet Street",
        price: 220,
        rent: 18,
    },
    {
        type: SpaceType.PROPERTY,
        id: 24,
        monopolyId: 5,
        name: "Trafalgar Square",
        price: 240,
        rent: 20,
    },
    {
        type: SpaceType.PROPERTY,
        id: 26,
        monopolyId: 6,
        name: "Leicester Square",
        price: 260,
        rent: 22,
    },
    {
        type: SpaceType.PROPERTY,
        id: 27,
        monopolyId: 6,
        name: "Coventry Street",
        price: 260,
        rent: 22,
    },
    {
        type: SpaceType.PROPERTY,
        id: 29,
        monopolyId: 6,
        name: "Piccadilly",
        price: 280,
        rent: 24,
    },
    {
        type: SpaceType.PROPERTY,
        id: 31,
        monopolyId: 7,
        name: "Regent Street",
        price: 300,
        rent: 26,
    },
    {
        type: SpaceType.PROPERTY,
        id: 32,
        monopolyId: 7,
        name: "Oxford Street",
        price: 300,
        rent: 26,
    },
    {
        type: SpaceType.PROPERTY,
        id: 34,
        monopolyId: 7,
        name: "Bond Street",
        price: 320,
        rent: 28,
    },
    {
        type: SpaceType.PROPERTY,
        id: 37,
        monopolyId: 8,
        name: "Park Lane",
        price: 350,
        rent: 35,
    },
    {
        type: SpaceType.PROPERTY,
        id: 39,
        monopolyId: 8,
        name: "Mayfair",
        price: 400,
        rent: 50,
    }
];

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledChanceCards = shuffle(ChanceCards);
export const chances: Chance[] = [ 
    {
        type: SpaceType.CHANCE,
        id: 7,
        text: shuffledChanceCards[0].text
    },
    {
        type: SpaceType.CHANCE,
        id: 22,
        text: shuffledChanceCards[1].text
    },
    {
        type: SpaceType.CHANCE,
        id: 36,
        text: shuffledChanceCards[2].text
    }
];

const shuffledCommunityChests = shuffle(CommunityChests);
export const communityChests: CommunityChest[] = [ 
    {
        type: SpaceType.COMMUNITY_CHEST,
        id: 2,
        text: shuffledCommunityChests[0].text
    },
    {
        type: SpaceType.COMMUNITY_CHEST,
        id: 17,
        text: shuffledCommunityChests[1].text
    },
    {
        type: SpaceType.COMMUNITY_CHEST,
        id: 33,
        text: shuffledCommunityChests[2].text
    }
];

export const go: Go = {
    type: SpaceType.GO,
    id: 0,
    name: "Go"
};

export const jail: Jail = {
    type: SpaceType.JAIL,
    id: 10,
    name: "Jail"
};

export const freeParking: FreeParking = {
    type: SpaceType.FREE_PARKING,
    id: 20,
    name: "Free Parking"
};

export const tax: Tax[] = [
{
    type: SpaceType.TAX,
    id: 4,
    name: "Income Tax",
    amount: 200
},
{
    type: SpaceType.TAX,
    id: 38,
    name: "Super Tax",
    amount: 100
}
];

export const goToJail: GO_TO_JAIL = {
    type: SpaceType.GO_TO_JAIL,
    id: 30,
    name: "Go To Jail"
 }

export const railroads: Railroad[] = [
    {
        type: SpaceType.RAILROAD,
        id: 5,
        name: "Kings Cross Station",
        price: 200,
        rent: 25
    },
    {
        type: SpaceType.RAILROAD,
        id: 15,
        name: "Marylebone Station",
        price: 200,
        rent: 25
    },
    {
        type: SpaceType.RAILROAD,
        id: 25,
        name: "Fenchurch St Station",
        price: 200,
        rent: 25
    },
    {
        type: SpaceType.RAILROAD,
        id: 35,
        name: "Liverpool St Station",
        price: 200,
        rent: 25
    }
  ];
 
export const electricCompany: ElectricCompany = { 
    type: SpaceType.ELECTRIC_COMPANY,
    id: 12,
    name: "Electric Company",
    price: 150
  };

export const waterWorks: WaterWorks = { 
    type: SpaceType.WATER_WORKS,
    id: 28,
    name: "Water Works",
    price: 150
};
