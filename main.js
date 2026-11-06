import gameState from "./state.js";

import {
    initializeCards,
    drawCard,
    updateHand,
} from "./cards.js";

import { opponentTurn } from "./opponent.js";

initializeCards();

const deckButton = document.querySelector("#draw-cards");

deckButton.addEventListener("click", function () {
    drawCard(gameState.players.player);
    updateHand();
});

document.addEventListener("player-summoned", () => {
    setTimeout(opponentTurn, 1500);
});

console.log("Player", gameState.players.player);
console.log("Opponent", gameState.players.opponent);