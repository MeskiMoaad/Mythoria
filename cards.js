
import gameState from "./state.js";
import boosters from "./boosters.js";

const cardsCollection = Object.values(boosters).flatMap(
    booster => booster.cards
);

function createDeck(player) {
    player.deck = cardsCollection
        .slice(0, 10)
        .map(card => ({ ...card }));
}

function drawCard(player) {
    if (player.hand.length >= 5) return;
    if (player.deck.length === 0) return;

    const card = player.deck.shift();
    player.hand.push(card);

    return card;
}
function updateHand() {
    const player = gameState.players.player;
    const slots = document.querySelectorAll(".player-card");

    slots.forEach((slot, index) => {
        const card = player.hand[index];

        if (card) {
            slot.innerHTML = `
                <img src="${card.image}"
                     class="w-full h-full object-cover rounded-lg">
            `;
        } else {
            slot.innerHTML = "";
        }
    });
}
function summonCard(player, cardId) {
    const index = player.hand.findIndex(card => card.id === cardId);

    if (index === -1) return;

    const card = player.hand.splice(index, 1)[0];
    player.battlefield.push(card);
}

function initializeCards() {
    createDeck(gameState.players.player);
    createDeck(gameState.players.opponent);

    for (let i = 0; i < 5; i++) {
        drawCard(gameState.players.player);
        drawCard(gameState.players.opponent);
    }

    updateHand();
}
export { createDeck, drawCard, summonCard, initializeCards, updateHand };