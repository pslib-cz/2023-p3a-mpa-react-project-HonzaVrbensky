import { Chance, SpaceType } from "../GameBoard";

export const ChanceCards: Chance[] = [
{
    type: SpaceType.CHANCE,
    id: 1,
    text: "Advance to Go (Collect $200)"
},
{
    type: SpaceType.CHANCE,
    id: 2,
    text: "Advance to Illinois Ave"
},
{
    type: SpaceType.CHANCE,
    id: 3,
    text: "Advance to St. Charles Place"
},
{
    type: SpaceType.CHANCE,
    id: 4,
    text: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown."
},
{
    type: SpaceType.CHANCE,
    id: 5,
    text: "Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank."
},
{
    type: SpaceType.CHANCE,
    id: 6,
    text: "Bank pays you dividend of $50"
},
{
    type: SpaceType.CHANCE,
    id: 7,
    text: "Get out of Jail Free"
},
{
    type: SpaceType.CHANCE,
    id: 8,
    text: "Go Back 3 Spaces"
},
{
    type: SpaceType.CHANCE,
    id: 9,
    text: "Go to Jail"
},
{
    type: SpaceType.CHANCE,
    id: 10,
    text: "Make general repairs on all your property: For each house pay $25, For each hotel $100"
},
{
    type: SpaceType.CHANCE,
    id: 11,
    text: "Pay poor tax of $15"
},
{
    type: SpaceType.CHANCE,
    id: 12,
    text: "Take a trip to Reading Railroad"
},
{
    type: SpaceType.CHANCE,
    id: 13,
    text: "Take a walk on the Boardwalk"
},
{
    type: SpaceType.CHANCE,
    id: 14,
    text: "You have been elected Chairman of the Board. Pay each player $50"
},
{
    type: SpaceType.CHANCE,
    id: 15,
    text: "Your building loan matures. Collect $150"
},
{
    type: SpaceType.CHANCE,
    id: 16,
    text: "You have won a crossword competition. Collect $100"
},
];

export default ChanceCards;