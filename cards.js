
import gameState from "./state.js";
import boosters from "./boosters.js";

const cardsCollection = Object.values(boosters).flatMap(
    booster => booster.cards
);

function createDeck(player) {
    player.deck = cardsCollection.map(card => ({ ...card }));
}
function drawCard(player) {
    if (player.hand.length >= 5)
        return;
    if (player.deck.length === 0)
        return;
    const card = player.deck.shift();
    player.hand.push(card);
}