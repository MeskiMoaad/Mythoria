import gameState from "./state.js";

import {
    initializeCards,
    drawCard,
    updateHand,
    updateOpponentHand,
   
} from "./cards.js";

initializeCards();

const deckButton = document.querySelector("#draw-cards");

deckButton.addEventListener("click", function () {
    drawCard(gameState.players.player);
    updateHand();
    updateOpponentHand()
});

console.log("Player", gameState.players.player);
console.log("Opponent", gameState.players.opponent);