
import gameState from "./state.js";
import boosters from "./boosters.js";

const cardsCollection = Object.values(boosters).flatMap(
    booster => booster.cards
);

function createDeck(player) {
    player.deck = cardsCollection.map(card => ({ ...card }));
}